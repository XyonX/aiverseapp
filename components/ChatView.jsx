"use client";

import { useState } from "react";
import {
  Plus,
  SearchIcon,
  Folder,
  Star,
  Clock,
  Filter,
  MoreVertical,
} from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";

export function ChatView({ bots, featuredBots, onBotClick }) {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const router = useRouter();
  const handleBotClick = (bot) => {
    console.log("bot clicked:", bot);
    setSelectedAIContact(bot);
    router.push(`/chat/${bot._id}`); // Navigate to chat page with bot ID
  };
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedBot } = useBot();
  const [activeTab, setActiveTab] = useState("all");

  const filteredBots = bots.filter((bot) =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const {
    user,
    aiContacts,
    selectedAIContact,
    setSelectedAIContact,
    recentChatContacts,
  } = useAppContext();

  const featuredBots1 = aiContacts?.slice(0, 5);
  // const filteredFeaturedBots = searchQuery
  //   ? featuredBots1.filter((bot) =>
  //       bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   : featuredBots1;

  const favoriteBots = user?.favoriteBots ?? [];

  const filteredFeaturedBots = featuredBots1.filter((bot) => {
    const matchesSearchQuery = bot.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearchQuery;
    //check for online && chat.isOnline
    if (activeTab === "online") return matchesSearchQuery;
    if (activeTab === "favorites")
      return matchesSearchQuery && favoriteBots.includes(bot._id);
  });

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

        const matchesSearchQuery = nameMatch || messageMatch;
        if (activeTab === "all") return matchesSearchQuery;
        //check for online && chat.isOnline
        if (activeTab === "online") return matchesSearchQuery;
        if (activeTab === "favorites")
          return matchesSearchQuery && chat.isFavorite;
      })
    : recentChatContacts;
  const unreadCount = recentChatContacts.reduce((count, chat) => {
    // const bot = aiContacts.find(((bot)=>(chat._botId==bot._id)));
    count + (chat.unreal || 0);
  }, 0);

  return (
    <div div className="flex flex-col h-full w-full">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">Chats</div>
          <div className="flex items-center gap-2">
            <Label className="flex items-center gap-2 text-sm">
              <span>Online</span>
              <Switch className="shadow-none" />
            </Label>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <SidebarInput
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </SidebarHeader>
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="border-b px-4">
          <TabsList className="h-10 w-full justify-start gap-4 rounded-none bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="h-10 rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="online"
              className="h-10 rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Online
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="h-10 rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent flex items-center gap-1"
            >
              Unread
              {unreadCount > 0 && (
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 text-xs font-medium"
                >
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="h-10 rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Star className="h-4 w-4 mr-1" />
              Favorites
            </TabsTrigger>
          </TabsList>
        </div>
        <SidebarContent className="overflow-x-auto">
          <SidebarGroup className="px-0 w-full">
            <SidebarGroupContent className="w-full">
              {/* featrured bots */}
              <div className="p-4 border-b w-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Featured Bots</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Bot</span>
                  </Button>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-2 w-full">
                  {filteredFeaturedBots.map((bot) => (
                    <div
                      key={bot.id}
                      className="flex flex-col items-center min-w-[60px] cursor-pointer"
                      onClick={() => handleBotClick(bot)}
                    >
                      <div className="relative">
                        <div className="p-1.5 rounded-full bg-gray-100 dark:bg-neutral-800">
                          <img
                            src={
                              `${BACKEND_URL}/uploads/${bot.avatar}` ||
                              "/placeholder.svg"
                            }
                            alt={bot.name}
                            // Reduced image size and added hover transition
                            className="w-10 h-10 rounded-full object-cover transition-transform hover:scale-105"
                          />
                        </div>

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
              {/* Chat Categories */}
              <div className="p-4 border-b">
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full"
                  >
                    <Folder className="h-3.5 w-3.5 mr-1" />
                    Work
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full"
                  >
                    <Folder className="h-3.5 w-3.5 mr-1" />
                    Personal
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full"
                  >
                    <Folder className="h-3.5 w-3.5 mr-1" />
                    Projects
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              {/* Recent Chats */}
              <div className="w-full">
                <div className="flex items-center justify-between p-4 pb-2">
                  <h3 className="text-sm font-medium">Recent Chats</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                  >
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    Sort by time
                  </Button>
                </div>
                {filteredChats.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      No chats found
                    </p>
                  </div>
                ) : (
                  <ul className="w-full">
                    {filteredChats.map((chat) => {
                      let bot = aiContacts.find(
                        (bot) => bot._id === chat.botId
                      );
                      // Format the Date object to a readable string
                      const formattedTime = new Date(
                        chat.time
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      return (
                        <li
                          key={bot.id}
                          className={`px-4 py-3  dark:hover:bg-neutral-700 cursor-pointer w-full ${
                            selectedAIContact &&
                            selectedAIContact._id === bot._id
                              ? "bg-gray-200 dark:bg-blue-900/20"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            let bot = aiContacts.find(
                              (bot) => bot._id === chat.botId
                            );
                            console.log(bot);
                            handleBotClick(bot);
                          }}
                        >
                          <div className="flex items-center w-full">
                            {/* Avatar */}
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
                                  {formattedTime}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-xs truncate text-gray-500 dark:text-gray-400">
                                  {chat.lastMessage}
                                </p>
                                {bot.unread > 0 && (
                                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                                    {bot.unread}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Tabs>
    </div>
  );
}
