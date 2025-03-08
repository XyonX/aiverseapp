"use client"; // This forces Next.js to treat it as a client component
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";

const AICarousel = () => {
  const { aiContacts } = useAppContext();
  const router = useRouter();

  const handleChatClick = (bot) => {
    console.log(bot);
    setSelectedAIContact(bot); // Set the selected contact in context
    console.log(bot);
    router.push(`/chat/${bot._id}`); // Navigate to chat page with bot name
  };
  return (
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
  );
};

export default AICarousel;
