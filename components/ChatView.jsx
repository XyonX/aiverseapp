"use client";

import { useState, useRef } from "react";
import {
  Plus,
  SearchIcon,
  Folder,
  Star,
  Clock,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; // Assuming you have this utility;

export function ChatView() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  // Inside your component
  const scrollContainerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  const router = useRouter();
  const handleBotClick = (bot) => {
    console.log("bot clicked:", bot);
    setSelectedAIContact(bot);
    router.push(`/chat/${bot._id}`); // Navigate to chat page with bot ID
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const {
    user,
    aiContacts,
    selectedAIContact,
    setSelectedAIContact,
    recentChatContacts,
  } = useAppContext();

  const featuredBots1 = aiContacts?.slice(0, 5);

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
    count + (chat.unreal || 0);
  }, 0);

  return (
    <div div className="flex flex-col h-full w-full">
      {/* --- ADJUSTED PADDING: p-4 -> p-2, GAP: gap-3.5 -> gap-2 --- */}
      <SidebarHeader className="gap-2 border-b py-4 px-2">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-semibold">Chats</div>{" "}
          {/* Use font-semibold for stronger heading */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {" "}
              {/* Consistent size */}
              <Filter className="h-4 w-4" /> {/* Consistent size */}
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
        <div className="relative w-full">
          <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />{" "}
          {/* Adjusted left position */}
          {/* --- ADJUSTED INPUT HEIGHT: Added h-9 --- */}
          <SidebarInput
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full h-9 text-sm" // Adjusted padding, height, text size
          />
        </div>
      </SidebarHeader>
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        {/* --- ADJUSTED PADDING: px-4 -> px-2 --- */}
        <div className="border-b px-4">
          {/* --- ADJUSTED GAP: gap-4 -> gap-2 --- */}
          {/* Adjusted Tab styles for consistency */}
          <TabsList className="h-auto w-full justify-start gap- rounded-none bg-transparent p-0">
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
        {/* Content Area: Contains fixed Featured/Categories and scrollable Recent */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* <SidebarGroup className="px-0 w-full">
            <SidebarGroupContent className="w-full"> */}
          {/* Featured Bots Section (Horizontally Scrollable, Fixed Height) */}

          {filteredFeaturedBots.length > 0 && (
            <div className="p-2 border-b w-full flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                  Featured
                </h3>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleScroll(-200)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Scroll left</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleScroll(200)}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Scroll right</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Bot</span>
                  </Button>
                </div>
              </div>
              <div
                ref={scrollContainerRef}
                className="flex space-x-4 overflow-x-auto pb-2 w-full scrollbar-hide"
              >
                {filteredFeaturedBots.map((bot) => (
                  <div
                    key={bot._id}
                    className="flex flex-col items-center w-16 flex-shrink-0 cursor-pointer group"
                    onClick={() => handleBotClick(bot)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleBotClick(bot)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-primary transition-colors">
                        <AvatarImage
                          src={`${BACKEND_URL}/uploads/${bot.avatar}`}
                          alt={bot.name}
                        />
                        <AvatarFallback>
                          {bot.name?.charAt(0) || "B"}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-background ring-1 ring-background",
                          "bg-gray-400"
                        )}
                      />
                    </div>
                    <span className="text-xs mt-1 text-muted-foreground truncate w-full text-center">
                      {bot.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* === Chat Categories Section (Fixed Height) === */}
          <div className="p-2 border-b flex-shrink-0">
            {/* --- ADJUSTED HEADING STYLE --- */}
            <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* --- Buttons kept size="sm" h-8, icon size adjusted --- */}
              <Button variant="outline" size="sm" className="h-8 rounded-full">
                <Folder className="h-4 w-4 mr-1.5" />{" "}
                {/* Increased icon size, adjusted margin */}
                Work
              </Button>
              <Button variant="outline" size="sm" className="h-8 rounded-full">
                <Folder className="h-4 w-4 mr-1.5" />
                Personal
              </Button>
              <Button variant="outline" size="sm" className="h-8 rounded-full">
                <Folder className="h-4 w-4 mr-1.5" />
                Projects
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                {" "}
                {/* Use size="icon" for consistency */}
                <Plus className="h-4 w-4" /> {/* Increased icon size */}
                <span className="sr-only">Add Category</span>
              </Button>
            </div>
          </div>
          {/* === End Categories Section === */}

          {/* Recent Chats Section (Vertically Scrollable, Takes Remaining Space) */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-2 pt-2 pb-1 flex-shrink-0">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                Recent
              </h3>
              <Button variant="ghost" size="sm" className="h-7 px-1.5 text-xs">
                {" "}
                <Clock className="h-3.5 w-3.5 mr-1" /> Sort{" "}
              </Button>
            </div>
            <ScrollArea className="flex-1 px-0">
              {filteredChats.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    {searchQuery
                      ? `No chats found for "${searchQuery}"`
                      : "No recent chats"}
                  </p>
                </div>
              ) : (
                <ul className="w-full divide-y divide-border">
                  {filteredChats.map((chat) => {
                    const bot = aiContacts.find((b) => b?._id === chat?.botId);
                    if (!bot) return null;
                    let formattedTime = " ";
                    try {
                      if (chat.time) {
                        const date = new Date(chat.time);
                        if (!isNaN(date.getTime())) {
                          formattedTime = date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          });
                        }
                      }
                    } catch (error) {
                      console.error("Error formatting time:", chat.time, error);
                    }
                    const isSelected = selectedAIContact?._id === bot._id;
                    return (
                      <li key={chat._id || bot._id}>
                        <button
                          className={cn(
                            "flex items-center w-full px-2 py-2.5 text-left hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
                            isSelected && "bg-accent"
                          )}
                          onClick={() => handleBotClick(bot)}
                        >
                          <div className="relative flex-shrink-0 mr-2.5">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={`${BACKEND_URL}/uploads/${bot.avatar}`}
                                alt={bot.name}
                              />
                              <AvatarFallback>
                                {bot.name?.charAt(0) || "B"}
                              </AvatarFallback>
                            </Avatar>
                            <span
                              className={cn(
                                "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border border-background ring-1 ring-background",
                                "bg-gray-400"
                              )}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                              <h4 className="text-sm font-medium truncate">
                                {bot.name}
                              </h4>
                              <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                                {formattedTime}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground truncate pr-2">
                                {chat.lastMessage || "..."}
                              </p>
                              {(chat.unread || 0) > 0 && (
                                <Badge
                                  variant="primary"
                                  className="h-5 px-1.5 text-xs font-medium flex-shrink-0"
                                >
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </ScrollArea>
          </div>
          {/* </SidebarGroupContent>
          </SidebarGroup> */}
        </div>
      </Tabs>
    </div>
  );
}
