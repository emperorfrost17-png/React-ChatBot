//I imported useState from React Package folder
import { useState, useEffect} from "react";
import {ChatInput} from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
//This is for loading the css
//this is feature of vite it helps us import any file
import "./App.css";
import { Chatbot } from "supersimpledev";




//The code below is the same as this i just used destructuring




function App() {
 

  //State is the data connected to the
  //this will convert this data into state so that when we update the data it will update the html
  const [chatMessages, setChatMessages] = useState([]);
  //now useState returns two values
  //1. The current data
  //2. A function that updates the data

  //N/B: If you update the data directly React will not update the html but if use the function that useState retutns it will returns React will update the html
  useEffect(() => {
    Chatbot.addResponses({
      hi : 'Whats up Nigga',
      yo: 'Fuck My Ass please Im begging you'
    })
  }, [])
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
      <ChatMessages chatMessages={chatMessages}/>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
