//I imported useState from React Package folder
import { useState, useRef, useEffect } from "react";
import { Chatbot } from "supersimpledev";
//For importing an image just give a name you want and locate the file pathe where the file is
import RobotProfileImage from "./assets/robot.png";
import UserProfileImage from "./assets/user.png";
import LoadingGif from "./assets/loading-spinner.gif";
//This is for loading the css
//this is feature of vite it helps us import any file
import "./App.css";

function ChatInput({ chatMessages, setChatMessages }) {
  //in React use State for saving data that changes over time

  const [inputText, setInputText] = useState("");
  //Think of isLoading as an on/off switch. false = not currently sending a message.
  const [isLoading, setIsLoading] = useState(false);
  function saveInputText(event) {
    // event.target.value this gives us the element that we're typing in or changed
    setInputText(event.target.value);
  }
  async function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: "user", id: crypto.randomUUID() },
    ];
    setChatMessages(newChatMessages);

    setInputText("");
    //Before doing anything, it checks: "Are we already sending a message? Or is the text box empty?" If either is true, it stops right there and does nothing.
    if (isLoading || inputText === "") {
      return;
    }
    //This happens right after the check passes, meaning "we are now busy sending a message." This is what makes the check in step 2 actually work the next time someone tries to send.
    setIsLoading(true);

    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-gif" src={LoadingGif} />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    //This is for getting a response from the chatbot loaded from an external js library
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      { message: response, sender: "robot", id: crypto.randomUUID() },
    ]);
    //Once the bot's response has come back and been added to the chat, isLoading resets to false, so the user can send another message.
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    // <></> This is called a fragment i used this so that it will directly insert this code inside the div variable before using that it was creating an extra div which sometimes we might not want
    <div className="chat-input-container">
      {/* This is a shortcut for <input></input> this is called self closing */}
      <input
        placeholder="Send a message to Chatbot"
        //onChange property is an event handler used in React that runs a function whenever the text inside an input element is changed.
        onChange={saveInputText}
        //this is for changing the value/text inside <input>
        //this called a controlled input
        // because if you check above you can see that i put setInputText('') so that it will later update it to nothing after clicking send
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        //for react we useclassName to set the class
        className="send-button"
      >
        Send
      </button>
    </div>
  );
}

//The code below is the same as this i just used destructuring
function ChatMessage({ message, sender }) {
  // ^ This destructures the props object
  // Instead of receiving props as a whole object,
  // it extracts message and sender directly
  // So you can use message and sender as variables
  // instead of props.message and props.sender to the <ChatMessage /> tag
  //It makes our components reusable

  //The code below is the same as this i just used destructuring
  //const message = props.message;
  //const sender = props.sender;

  //const { message, sender } = props;

  /*
        if (sender === "robot") {
          return (
            <div>
              <img src="robot.png" width="50" />
              {message}
            </div>
          );
        }
        */
  return (
    // <></> This is called a fragment i used this so that it will directly insert this code inside the div variable before using that it was creating an extra div which sometimes we might not want
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {/*
               Conditional Rendering with && Operator

              Syntax:
              condition && thingToRender

              If the condition is true, React renders the thing on the right.
              If the condition is false, React renders nothing.
              */}
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  // Custom Hook: this creates a ref for the chat messages container.
  // Whenever the dependencies change, it scrolls that container to the bottom.
  // In this component, [chatMessages] is passed in so the chat scrolls down
  // automatically every time a new message is added.
  function useAutoScroll(dependencies) {
    const containerRef = useRef(null);
    useEffect(() => {
      //over here i saved the ref in a variable
      const containerElem = containerRef.current;
      if (containerElem) {
        //So this line says: "set the scroll position equal to the full content height," which effectively scrolls the container all the way to the bottom.
        containerElem.scrollTop = containerElem.scrollHeight;
      }
    }, dependencies); //this is called a dependency array because it controls when the useEffect runs

    return containerRef;
  }
  //useEffect is a React Hook it runs some code after the component is created or updated
  // useEffect can have two parameters the first can be a function and the second one can be an array
  // if the array is empty [] the function or the first parameter will run once if it has a variable inside for exmaple [chatMessages] now it is going to run the function every time chatMessages changes

  //this help save automatically an HTML element from the component

  {
    /*
          .map() loops through the chatMessages array and converts each message object into a <ChatMessage /> component
          This renders all messages dynamically instead of hardcoding each component
          */
  }

  return (
    //the ref prop bellow is for the React.useEffect() hook to target the div bellow
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {/*
               .map() loops through the chatMessages array and converts each message object into a <ChatMessage /> component
               This renders all messages dynamically instead of hardcoding each component

              */}

      {chatMessages.map((chatMessage) => {
        //In react when you use an array of components each item will need a unique key prop
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  //State is the data connected to the
  //this will convert this data into state so that when we update the data it will update the html
  const [chatMessages, setChatMessages] = useState([]);
  //now useState returns two values
  //1. The current data
  //2. A function that updates the data

  //N/B: If you update the data directly React will not update the html but if use the function that useState retutns it will returns React will update the html
  return (
    <div className="app-container">
      {/*
              This is also considered a shortcut instead of saving it in a variable then putting it here i just put the code directly
              
              This also another way of generating the HTML
              */}
      {chatMessages.length === 0 && (
        <p className="welcome-text">
          Welcome to the chatbot project! Send a message using the textbox below
        </p>
      )}
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
