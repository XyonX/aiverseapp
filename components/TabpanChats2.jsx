"use client"; // This forces Next.js to treat it as a client component
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";

const TabPanchats2 = () => {
  const { aiContacts, setSelectedAIContact, recentChatContacts } =
    useAppContext(); // Get AI contacts from context
  const router = useRouter();

  const handleChatClick = (bot) => {
    console.log(bot);
    setSelectedAIContact(bot); // Set the selected contact in context
    router.push(`/chat/${bot._id}`); // Navigate to chat page with bot ID
  };

  useEffect(() => {
    console.log(aiContacts);
  }, [aiContacts]);

  return (
    <div>
      {/* Search Section */}
      <div className="px-6 pt-6">
        <h4 className="mb-0 text-gray-800 dark:text-white">Chats</h4>
        <div className="py-1 mt-5 mb-5 rounded bg-white dark:bg-neutral-900">
          <span className="pe-1 ps-3" id="basic-addon1">
            <i className="text-lg text-gray-500 dark:text-neutral-400 ri-search-line search-icon"></i>
          </span>
          <input
            type="text"
            className="border-0 bg-white dark:bg-neutral-900 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 placeholder:text-gray-500 dark:placeholder:text-neutral-400"
            placeholder="Search messages or AI contacts"
            aria-label="Search messages or AI contacts"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>

      {/* AI Carousel */}
      <div className="px-6 pb-6" dir="ltr">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={16}
          className="user-status-carousel"
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {aiContacts.map((ai) => (
            <SwiperSlide key={ai.id} className="!w-auto">
              <div className="text-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChatClick(ai);
                  }}
                  className="block p-2 mt-4 rounded bg-white dark:bg-neutral-900"
                >
                  <div className="relative mx-auto w-9 h-9">
                    <img
                      src={`http://localhost:3001/uploads/${ai.avatar}`}
                      alt={ai.name}
                      className="rounded-full w-full h-full"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full dark:border-neutral-700"></span>
                  </div>
                  <h5 className="mt-4 mb-0 truncate text-xs text-gray-800 dark:text-white">
                    {ai.name}
                  </h5>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Recent AI Chats Section */}
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
                      let bot = aiContacts.find(
                        (bot) => bot._id === chat.botId
                      );
                      handleChatClick(bot);
                    }}
                  >
                    <div className="relative flex">
                      <div className="relative self-center ltr:mr-3 rtl:ml-3">
                        <img
                          src={`http://localhost:3001/uploads/${bot.avatar}`}
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
    </div>
  );
};

export default TabPanchats2;
