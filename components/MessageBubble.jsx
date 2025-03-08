import React from "react";
import { MessageType } from "./messageTypes";

import ImageBubble from "./ImageBubble";
import FileBubble from "./FileBubble";
import TextBubble from "./TextBubble";

function MessageBubble({ message, themeColor, isUser }) {
  //const { type, data } = message;
  const { type } = message;
  console.log("loggin message");
  console.log(message);
  let BubbleComponent = TextBubble;

  switch (type) {
    case MessageType.TEXT:
      BubbleComponent = TextBubble;
      break;
    case MessageType.IMAGE:
      BubbleComponent = ImageBubble;
      break;
    case MessageType.FILE:
      BubbleComponent = FileBubble;
      break;
    default:
      BubbleComponent = () => <div>Unknown message type</div>;
  }

  return (
    <div
      className={`relative px-5 py-3 rounded-lg ${getColorClass(themeColor)} ${
        isUser ? "rounded-bl-none" : "rounded-br-none"
      } max-w-[90vw] md:max-w-[45rem] w-fit`} // Added width constraints
    >
      <BubbleComponent message={message} />
      <p className="mt-1 text-xs text-right text-white/50">
        <i className="ri-time-line"></i>{" "}
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent before:left-0 before:-bottom-2 before:border-l-[color] before:border-t-[color]"></div>
    </div>
  );
}

function getColorClass(themeColor) {
  switch (themeColor) {
    case "violet":
      return "bg-violet-500";
    case "green":
      return "bg-green-500";
    case "red":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export default MessageBubble;
