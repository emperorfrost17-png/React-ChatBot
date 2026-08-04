//For importing an image just give a name you want and locate the file pathe where the file is
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/profile-1.jpg";

import "./ChatMessage.css";
import dayjs from "dayjs";

export function ChatMessage({ message, sender, time }) {
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
      <div className="chat-message-text">
        {message}

        {time && (
          <div className="chat-message-time">{dayjs(time).format("h:mma")}</div>
        )}
      </div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
