// "use client"; // This forces Next.js to treat it as a client component
// import React, { useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { useAppContext } from "@/app/AppProvider";
// import { useRouter } from "next/navigation";

// const TabPanchats2 = () => {
//   const { aiContacts, setSelectedAIContact, recentChatContacts } =
//     useAppContext(); // Get AI contacts from context
//   const router = useRouter();

//   const handleChatClick = (bot) => {
//     console.log(bot);
//     setSelectedAIContact(bot); // Set the selected contact in context
//     router.push(`/chat/${bot._id}`); // Navigate to chat page with bot ID
//   };

//   useEffect(() => {
//     console.log(aiContacts);
//   }, [aiContacts]);

//   return (
//     <div>
//       {/* Search Section */}
//       <div className="px-6 pt-6">
//         <h4 className="mb-0 text-gray-800 dark:text-white">Chats</h4>
//         <div className="py-1 mt-5 mb-5 rounded bg-white dark:bg-neutral-900">
//           <span className="pe-1 ps-3" id="basic-addon1">
//             <i className="text-lg text-gray-500 dark:text-neutral-400 ri-search-line search-icon"></i>
//           </span>
//           <input
//             type="text"
//             className="border-0 bg-white dark:bg-neutral-900 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 placeholder:text-gray-500 dark:placeholder:text-neutral-400"
//             placeholder="Search messages or AI contacts"
//             aria-label="Search messages or AI contacts"
//             aria-describedby="basic-addon1"
//           />
//         </div>
//       </div>

//       {/* AI Carousel */}
//       <div className="px-6 pb-6" dir="ltr">
//         <Swiper
//           slidesPerView={"auto"}
//           spaceBetween={16}
//           className="user-status-carousel"
//           breakpoints={{
//             640: { slidesPerView: 4 },
//             1024: { slidesPerView: 5 },
//           }}
//         >
//           {aiContacts.map((ai) => (
//             <SwiperSlide key={ai.id} className="!w-auto">
//               <div className="text-center">
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleChatClick(ai);
//                   }}
//                   className="block p-2 mt-4 rounded bg-white dark:bg-neutral-900"
//                 >
//                   <div className="relative mx-auto w-9 h-9">
//                     <img
//                       src={`http://localhost:3001/uploads/${ai.avatar}`}
//                       alt={ai.name}
//                       className="rounded-full w-full h-full"
//                     />
//                     <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full dark:border-neutral-700"></span>
//                   </div>
//                   <h5 className="mt-4 mb-0 truncate text-xs text-gray-800 dark:text-white">
//                     {ai.name}
//                   </h5>
//                 </a>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Recent AI Chats Section */}
//       <div>
//         <h5 className="px-6 mb-4 text-16 text-gray-800 dark:text-white">
//           Recent
//         </h5>
//         <div className="h-[610px] px-2" data-simplebar>
//           <ul className="chat-user-list">
//             {recentChatContacts.map((chat) => {
//               let bot = aiContacts.find((bot) => bot._id === chat.botId);
//               return (
//                 <li
//                   key={chat.id}
//                   className={`px-5 py-[15px] hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all ease-in-out border-b border-gray-200 dark:border-neutral-700 ${
//                     chat.unread > 0 ? "unread" : ""
//                   }`}
//                 >
//                   <a
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       let bot = aiContacts.find(
//                         (bot) => bot._id === chat.botId
//                       );
//                       handleChatClick(bot);
//                     }}
//                   >
//                     <div className="relative flex">
//                       <div className="relative self-center ltr:mr-3 rtl:ml-3">
//                         <img
//                           src={`http://localhost:3001/uploads/${bot.avatar}`}
//                           className="rounded-full w-9 h-9"
//                           alt={bot.name}
//                         />
//                         <span
//                           className={`absolute w-2.5 h-2.5 ${
//                             chat.status === "online"
//                               ? "bg-green-500"
//                               : "bg-yellow-500"
//                           } border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-neutral-700`}
//                         ></span>
//                       </div>
//                       <div className="flex-grow overflow-hidden">
//                         <h5 className="mb-1 text-base truncate text-gray-800 dark:text-white">
//                           {bot.name}
//                         </h5>
//                         <p
//                           className="mb-0 text-gray-600 dark:text-neutral-400 truncate text-14"
//                           dangerouslySetInnerHTML={{ __html: chat.lastMessage }}
//                         ></p>
//                       </div>
//                       <div className="text-gray-500 dark:text-neutral-500 text-11">
//                         {chat.time}
//                       </div>
//                       {chat.unread > 0 && (
//                         <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
//                           <span className="px-2 py-1 text-blue-600 dark:text-blue-200 rounded-full bg-blue-100 dark:bg-blue-900 text-11">
//                             {chat.unread.toString().padStart(2, "0")}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TabPanchats2;
"use client"; // This forces Next.js to treat it as a client component
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";

const TabPanchats2 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { aiContacts, setSelectedAIContact, recentChatContacts } =
    useAppContext(); // Get AI contacts from context
  const router = useRouter();

  const handleChatClick = (bot) => {
    console.log(bot);
    setSelectedAIContact(bot); // Set the selected contact in context
    router.push(`/chat/${bot._id}`); // Navigate to chat page with bot ID
  };

  // Filter and select the first 5 bots from aiContacts
  const onlineBots = aiContacts?.slice(0, 5) || [];

  useEffect(() => {
    console.log(aiContacts);
  }, [aiContacts]);

  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

  return (
    <div className="w-full md:w-80 lg:w-96 h-screen border-r border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Chats
        </h2>

        {/* Search */}
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200 dark:placeholder-gray-400"
            placeholder="Search messages or users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Featured Bots */}
      <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
          Featured AI
        </h3>
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {onlineBots.map((bot) => (
            <div
              key={bot.id}
              className="flex flex-col items-center min-w-[60px] cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleChatClick(bot);
              }}
            >
              <div className="relative">
                <img
                  src={
                    `${BACKEND_URL}/uploads/${bot.avatar}` || "/placeholder.svg"
                  }
                  alt={bot.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-800 ${
                    /*bot.status === "online" ? "bg-green-500" :*/ "bg-yellow-500"
                  }`}
                ></span>
              </div>
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-300 truncate w-full text-center">
                {bot.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 p-4 pb-2">
          Recent Chats
        </h3>
        <ul className="divide-y divide-gray-200 dark:divide-neutral-700">
          {recentChatContacts.map((chat) => {
            let bot = aiContacts.find((bot) => bot._id === chat.botId);
            return (
              <li
                key={chat.id}
                // className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer ${
                //   chat.active ? "bg-blue-50 dark:bg-blue-900/20" : ""
                // }`}
                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer 
                  "bg-blue-50 dark:bg-blue-900/20" 
                `}
                onClick={(e) => {
                  e.preventDefault();
                  handleChatClick(bot);
                }}
              >
                <div className="flex items-center">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {typeof bot.avatar === "string" &&
                    bot.avatar.length === 1 ? (
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                        {bot.avatar}
                      </div>
                    ) : (
                      <img
                        src={
                          `${BACKEND_URL}/uploads/${bot.avatar}` ||
                          "/placeholder.svg"
                        }
                        alt={bot.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-neutral-800 ${
                        chat.status === "online"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></span>
                  </div>

                  {/* Content */}
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {bot.name}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p
                        // className={`text-xs truncate ${
                        //   chat.typing
                        //     ? "text-blue-600 dark:text-blue-400"
                        //     : "text-gray-500 dark:text-gray-400"
                        // }`}
                        className="text-xs truncate  text-gray-500 dark:text-gray-400"
                      >
                        {/* {chat.typing ? (
                          <span className="flex items-center">
                            typing
                            <span className="flex ml-1">
                              <span className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce mx-0.5"></span>
                              <span className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce mx-0.5 animation-delay-200"></span>
                              <span className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce mx-0.5 animation-delay-400"></span>
                            </span>
                          </span>
                        ) : (
                          chat.lastMessage
                        )} */}
                        chat.lastMessage
                      </p>
                      {chat.unread > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>New Chat</span>
        </button>
      </div>
    </div>
  );
};

export default TabPanchats2;
