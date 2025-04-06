"use client";

import { useEffect, useState } from "react";
import { Command, User, MessageSquare, Users, Settings } from "lucide-react";

import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ProfileView } from "./ProfileView";
import { ChatView } from "./ChatView";
import { ContactsView } from "./ContactsView";
import { SettingsView } from "./SettingsView";
import { useBot } from "@/context/BotContext";
import { useAppContext } from "@/app/AppProvider";
import { ThemeToggle } from "./theme-toggle";
import { Separator } from "@/components/ui/separator";
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    bio: "UI designer and developer",
    status: "online",
  },
  navMain: [
    { title: "profile", icon: User, isActive: false },
    { title: "chats", icon: MessageSquare, isActive: true },
    { title: "contacts", icon: Users, isActive: false },
    { title: "settings", icon: Settings, isActive: false },
  ],
  bots: [
    {
      id: "1",
      name: "Assistant",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
      lastMessage: "How can I help you today?",
      time: "09:34 AM",
      unread: 2,
    },
    {
      id: "2",
      name: "CodeBot",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
      lastMessage: "I've analyzed your code.",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: "3",
      name: "HealthAI",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "offline",
      lastMessage: "Remember to drink water!",
      time: "2 days ago",
      unread: 0,
    },
    {
      id: "4",
      name: "TravelBot",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
      lastMessage: "Here are your flight details.",
      time: "3 days ago",
      unread: 1,
    },
    {
      id: "5",
      name: "FinanceAI",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "offline",
      lastMessage: "Your budget report is ready.",
      time: "1 week ago",
      unread: 0,
    },
  ],
  featuredBots: [
    {
      id: "1",
      name: "Assistant",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
    },
    {
      id: "2",
      name: "CodeBot",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
    },
    {
      id: "3",
      name: "HealthAI",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "offline",
    },
    {
      id: "4",
      name: "TravelBot",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
    },
    {
      id: "5",
      name: "FinanceAI",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "offline",
    },
  ],
};

export function AppSidebar(props) {
  const [activeItem, setActiveItem] = useState(data.navMain[1]);
  const { setSelectedBot } = useBot();
  const { setOpen } = useSidebar();

  const handleBotClick = (bot) => {
    console.log("bot clicked:", bot);
    setSelectedAIContact(bot);
    router.push(`/chat/${bot._id}`); // Navigate to chat page with bot ID
  };

  //actual data
  // const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { changeTab, setSelectedAIContact } = useAppContext();

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderView = () => {
    switch (activeItem.title) {
      case "profile":
        return <ProfileView user={data.user} />;
      case "chat":
        return (
          <ChatView
            bots={data.bots}
            featuredBots={data.featuredBots}
            onBotClick={setSelectedBot}
          />
        );
      case "contacts":
        return <ContactsView bots={data.bots} onBotClick={setSelectedBot} />;
      case "settings":
        return <SettingsView />;
      default:
        return (
          <ChatView
            bots={data.bots}
            featuredBots={data.featuredBots}
            onBotClick={setSelectedBot}
          />
        );
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* First sidebar for navigation */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    {/* Logo */}
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">ChatBot</span>
                    <span className="truncate text-xs">AI Messenger</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        changeTab(item.title);
                        setOpen(true);
                        setSelectedBot(null);
                        setSelectedAIContact(null);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2 py-1 flex justify-center">
            <ThemeToggle />
          </div>
          <Separator className="my-1" />
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
      {/* Sidebar rendering pannel based on selected option from left side pannel */}
      <Sidebar
        collapsible="none"
        className="hidden flex-1 md:flex w-full overflow-hidden"
      >
        {renderView()}
      </Sidebar>
    </Sidebar>
  );
}
