//I imported useState from React Package folder
import { useState } from "react";
import { Chatbot } from "supersimpledev";
//For importing an image just give a name you want and locate the file pathe where the file is
import LoadingGif from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
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
