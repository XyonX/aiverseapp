"use client"; // This forces Next.js to treat it as a client component
import React, { useEffect } from "react";
import "swiper/css";
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";

const RecentChats = () => {
  const { aiContacts } = useAppContext();
  const router = useRouter();
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const handleChatClick = (bot) => {
    console.log(bot);
    setSelectedAIContact(bot); // Set the selected contact in context
    console.log(bot);
    router.push(`/chat/${bot._id}`); // Navigate to chat page with bot name
  };
  return (
    <div>
      <h5 className="px-6 mb-4 text-16 text-gray-800 dark:text-white">
        Recent
      </h5>
      <div className="h-[610px] px-2" data-simplebar>
        <ul className="chat-user-list">
          {recentChatContacts.map((chat) => {
            let bot = aiContacts.find((bot) => bot._id === chat.botId);
            return (
              <li
                key={chat.id}
                className={`px-5 py-[15px] hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all ease-in-out border-b border-gray-200 dark:border-neutral-700 ${
                  chat.unread > 0 ? "unread" : ""
                }`}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    let bot = aiContacts.find((bot) => bot._id === chat.botId);
                    handleChatClick(bot);
                  }}
                >
                  <div className="relative flex">
                    <div className="relative self-center ltr:mr-3 rtl:ml-3">
                      <img
                        src={`${BACKEND_URL}/uploads/${bot.avatar}`}
                        className="rounded-full w-9 h-9"
                        alt={bot.name}
                      />
                      <span
                        className={`absolute w-2.5 h-2.5 ${
                          chat.status === "online"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-neutral-700`}
                      ></span>
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <h5 className="mb-1 text-base truncate text-gray-800 dark:text-white">
                        {bot.name}
                      </h5>
                      <p
                        className="mb-0 text-gray-600 dark:text-neutral-400 truncate text-14"
                        dangerouslySetInnerHTML={{ __html: chat.lastMessage }}
                      ></p>
                    </div>
                    <div className="text-gray-500 dark:text-neutral-500 text-11">
                      {chat.time}
                    </div>
                    {chat.unread > 0 && (
                      <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                        <span className="px-2 py-1 text-blue-600 dark:text-blue-200 rounded-full bg-blue-100 dark:bg-blue-900 text-11">
                          {chat.unread.toString().padStart(2, "0")}
                        </span>
                      </div>
                    )}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecentChats;
