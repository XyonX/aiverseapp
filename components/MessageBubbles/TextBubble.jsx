import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const TextBubble = ({ sender, message, userAvatar, botAvatar }) => {
  if (!message?.trim()) return null;
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  return (
    <>
      {sender === "bot" ? (
        <li className="flex gap-x-2 sm:gap-x-4">
          <div className="shrink-0">
            <Image
              src={`${BACKEND_URL}/uploads/${botAvatar}`}
              width={36}
              height={36}
              className="rounded-full"
              alt="Bot avatar"
            />
          </div>
          {/* Moved className to parent div */}
          <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 dark:bg-neutral-900 dark:border-neutral-700 prose dark:prose-invert">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        </li>
      ) : (
        <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
          <div className="grow text-end space-y-3">
            <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
              <p className="text-sm text-white">
                <ReactMarkdown>{message}</ReactMarkdown>
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Image
              src={`${BACKEND_URL}/uploads/${userAvatar}`}
              width={36}
              height={36}
              className="rounded-full"
              alt="User avatar"
            />
          </div>
        </li>
      )}
    </>
  );
};

export default TextBubble;
