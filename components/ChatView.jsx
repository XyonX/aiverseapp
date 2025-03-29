"use client";

import React from "react";
import { Bot, Plus } from "lucide-react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useBot } from "@/context/BotContext";
import { useAppContext } from "@/app/AppProvider";

export function ChatView({ bots, featuredBots, onBotClick }) {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const handleBotClick = (bot) => {
    console.log("bot clicked:", bot);
    setSelectedAIContact(bot);
  };
  const [searchQuery, setSearchQuery] = React.useState("");
  const { selectedBot } = useBot();

  const filteredBots = bots.filter((bot) =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { aiContacts, setSelectedAIContact, recentChatContacts } =
    useAppContext();

  const featuredBots1 = aiContacts?.slice(0, 6);
  const filteredFeaturedBots = searchQuery
    ? featuredBots1.filter((bot) =>
        bot.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : featuredBots1;

  const filteredChats = searchQuery
    ? recentChatContacts.filter((chat) => {
        const bot = aiContacts.find((bot) => bot._id === chat.botId);
        if (!bot) return false;
        const nameMatch = bot.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const messageMatch = chat.lastMessage
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
        return nameMatch || messageMatch;
      })
    : recentChatContacts;

  return (
    <>
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">Chats</div>
          <Label className="flex items-center gap-2 text-sm">
            <span>Online</span>
            <Switch className="shadow-none" />
          </Label>
        </div>
        <SidebarInput
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SidebarHeader>
      <SidebarContent className="overflow-x-auto">
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Featured Bots</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add Bot</span>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 pb-2">
                {filteredFeaturedBots.map((bot) => (
                  <div
                    key={bot.id}
                    className="flex flex-col items-center min-w-[60px] max-w-[80px] cursor-pointer"
                    onClick={() => handleBotClick(bot)}
                  >
                    <div className="relative">
                      <img
                        src={
                          `${BACKEND_URL}/uploads/${bot.avatar}` ||
                          "/placeholder.svg"
                        }
                        alt={bot.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-800 ${
                          bot.status === "online"
                            ? "bg-green-500"
                            : "bg-yellow-500"
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

            <div>
              <h3 className="text-sm font-medium p-4 pb-2">Recent Chats</h3>
              <ul>
                {filteredChats.map((chat) => {
                  let bot = aiContacts.find((bot) => bot._id === chat.botId);
                  return (
                    <li
                      key={bot.id}
                      className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer ${
                        selectedBot && selectedBot.id === bot.id
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                      onClick={() => onBotClick(bot)}
                    >
                      <div className="flex items-center">
                        <div className="relative flex-shrink-0">
                          <img
                            src={
                              `${BACKEND_URL}/uploads/${bot.avatar}` ||
                              "/placeholder.svg"
                            }
                            alt={bot.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span
                            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-neutral-800 ${
                              bot.status === "online"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          ></span>
                        </div>
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
                            <p className="text-xs truncate text-gray-500 dark:text-gray-400">
                              {chat.lastMessage}
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
}
