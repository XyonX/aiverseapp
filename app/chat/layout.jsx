"use client";

import { useState } from "react";
import SidebarMenu2 from "../../components/SidebarMenu2";
import ChatLeftSidebar from "../../components/ChatLeftSidebar";

export default function ChatLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileChatListOpen, setMobileChatListOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50 dark:bg-neutral-900">
      {/* Mobile Header - visible only on small screens */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-800">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 dark:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          AIverse
        </h1>
        <button
          onClick={() => setMobileChatListOpen(!mobileChatListOpen)}
          className="text-gray-700 dark:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Sidebar - always visible on desktop, toggleable on mobile */}
      <div
        className={`
        ${mobileMenuOpen ? "block" : "hidden"} 
        md:block fixed md:relative z-30 h-screen
        transition-all duration-300 ease-in-out
      `}
      >
        <SidebarMenu2 />
      </div>

      {/* Chat List Sidebar - always visible on desktop, toggleable on mobile */}
      <div
        className={`
        ${mobileChatListOpen ? "block" : "hidden"} 
        md:block fixed md:relative z-20 h-screen w-full md:w-auto
        transition-all duration-300 ease-in-out
        md:max-w-[380px] bg-gray-50 dark:bg-neutral-800
      `}
      >
        <ChatLeftSidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-auto">{children}</main>

      {/* Overlay for mobile when sidebar is open */}
      {(mobileMenuOpen || mobileChatListOpen) && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileChatListOpen(false);
          }}
        />
      )}
    </div>
  );
}
