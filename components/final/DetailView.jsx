"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/utils/useMediaQuery";
import {
  Command,
  User,
  MessageSquare,
  Users,
  Settings,
  Store,
} from "lucide-react";

import { NavUser } from "../NavUser";
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
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { ProfileView } from "../ProfileView";
import { ChatView } from "../ChatView";
import { ContactsView } from "../ContactsView";
import { SettingsView } from "../SettingsView";
import { useBot } from "@/context/BotContext";
import { useAppContext } from "@/app/AppProvider";
import { ThemeToggle } from "../theme-toggle";
import { Separator } from "@/components/ui/separator";
import DiscoverView from "../DiscoverView";
import ConversationArea from "./ConversationArea";

const data = {
  user: {
    name: "joy",
    email: "joyydiip@gmail.com",
    avatar: "/user-avatar.svg",
    bio: "Full stack and game dev",
    status: "online",
  },
  navMain: [
    { title: "profile", icon: User, isActive: false },
    { title: "chats", icon: MessageSquare, isActive: false },
    { title: "contacts", icon: Users, isActive: false },
    { title: "discover", icon: Store, isActive: true },
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

const DetailView = () => {
  const router = useRouter();
  const { setSelectedBot } = useBot();
  const [mounted, setMounted] = useState(false);
  const { activeTab, selectedAIContact, setSelectedAIContact } =
    useAppContext();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBotClick = (bot) => {
    console.log("bot clicked:", bot);
    setSelectedAIContact(bot);
    router.push(`/chat/${bot._id}`); // Navigate to chat page with bot ID
  };

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  if (!mounted) return null;

  // If a contact is selected on mobile, show the conversation
  if (isMobile && selectedAIContact) {
    // return <ConversationArea currentBot={selectedAIContact} />;
    return <ConversationArea />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
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
      case "discover":
        return <DiscoverView />;
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
    <Sidebar collapsible="none" className="h-full w-full flex flex-col ">
      {renderTabContent()}
    </Sidebar>
  );
};

export default DetailView;
