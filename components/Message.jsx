import React from "react";
import Image from "next/image";
import MessageBubble from "./MessageBubble";
import MessageActions from "./MessageActions";

function Message({ message, selectedAIContact, user }) {
  const isUser = message.sender === "user";
  const senderName = isUser ? "You" : selectedAIContact.name;
  //const themeColor = isUser ? "blue" : selectedAIContact.themeColor;
  const themeColor = isUser ? "blue" : "red";

  return (
    <li key={message._id} className="py-4">
      <div className={`flex gap-3 items-end ${isUser ? "justify-end" : ""}`}>
        {!isUser && (
          <Image
            src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
        <div className={isUser ? "text-right" : ""}>
          <div className="flex gap-2 mb-2">
            <MessageBubble
              message={message}
              themeColor={themeColor}
              isUser={isUser}
            />
            <MessageActions message={message} />
          </div>
          <div className="font-medium text-gray-700 dark:text-gray-300 text-sm">
            {senderName}
          </div>
        </div>
        {isUser && (
          <Image
            src={`http://localhost:3001/uploads/${user.avatar}`}
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
      </div>
    </li>
  );
}

export default Message;
