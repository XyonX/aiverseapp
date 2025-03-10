"use client";

import Image from "next/image";
import Link from "next/link";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/AppProvider";

const SidebarMenu = ({ isMobile = false }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { activeTab, changeTab } = useAppContext();

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Mobile bottom navigation
  if (isMobile) {
    return (
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => changeTab("profile")}
          className={`flex flex-col justify-center items-center w-full h-full ${
            activeTab === "profile"
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </button>

        <button
          onClick={() => changeTab("chats")}
          className={`flex flex-col justify-center items-center w-full h-full ${
            activeTab === "chats"
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-xs mt-1">Chats</span>
        </button>

        <button
          onClick={() => changeTab("groups")}
          className={`flex flex-col justify-center items-center w-full h-full ${
            activeTab === "groups"
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-xs mt-1">Groups</span>
        </button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex flex-col justify-center items-center w-full h-full text-gray-500 dark:text-gray-400"
        >
          {theme === "dark" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <span className="text-xs mt-1">Light</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span className="text-xs mt-1">Dark</span>
            </>
          )}
        </button>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <div className="flex flex-col w-[70px] h-screen bg-white border-r border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
      {/* Logo */}
      <div className="flex justify-center py-6">
        <Link href="/" className="flex-none">
          <img
            src={`${BACKEND_URL}/uploads/aiverse.png`}
            alt="Aiverse Logo"
            className="h-[30px]"
          ></img>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col items-center py-6 space-y-8">
        <button
          onClick={() => changeTab("profile")}
          className={`flex justify-center items-center w-10 h-10 rounded-lg ${
            activeTab === "profile"
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500"
              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        <button
          onClick={() => changeTab("chats")}
          className={`flex justify-center items-center w-10 h-10 rounded-lg ${
            activeTab === "chats"
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500"
              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        <button
          onClick={() => changeTab("groups")}
          className={`flex justify-center items-center w-10 h-10 rounded-lg ${
            activeTab === "groups"
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500"
              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </button>

        <button
          onClick={() => changeTab("contacts")}
          className={`flex justify-center items-center w-10 h-10 rounded-lg ${
            activeTab === "contacts"
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500"
              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        </button>

        <button
          onClick={() => changeTab("settings")}
          className={`flex justify-center items-center w-10 h-10 rounded-lg ${
            activeTab === "settings"
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500"
              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center py-6 space-y-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex justify-center items-center w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <button className="flex justify-center items-center w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-neutral-700">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
