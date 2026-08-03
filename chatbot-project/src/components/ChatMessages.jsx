import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";
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
      } // eslint-disable-next-line react-hooks/exhaustive-deps
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
export default ChatMessages;
