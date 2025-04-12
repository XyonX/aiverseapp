//navigatiponpane jsx
"use client";

import { useEffect, useState } from "react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { useBot } from "@/context/BotContext";
import { useAppContext } from "@/app/AppProvider";
import { ThemeToggle } from "../theme-toggle";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/utils/useMediaQuery";
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
};

const NavigationPane = ({ className }) => {
  const { changeTab, activeTab, setSelectedAIContact } = useAppContext();
  const { setOpen } = useSidebar();
  const [mounted, setMounted] = useState(false);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sidebar
      collapsible="none"
      className={`border-r flex-shrink-0 ${className}`}
    >
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              tooltip={{
                children: (
                  <div className="space-y-1">
                    <p className="font-semibold">ChatBot</p>
                    <p className="text-xs text-muted-foreground">
                      AI Messenger
                    </p>
                  </div>
                ),
                hidden: false,
                side: "right",
                sideOffset: 10,
              }}
              className="justify-center p-0 md:justify-center md:p-2"
            >
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
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
                      side: "right",
                      sideOffset: 10,
                    }}
                    onClick={() => {
                      changeTab(item.title);
                      setOpen(true);
                      setSelectedAIContact(null);
                    }}
                    isActive={activeTab === item.title}
                    className="justify-center px-0 md:justify-center md:px-2" // Keep centered
                  >
                    <item.icon />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <div className="px-0 py-1 flex justify-center md:px-2">
          <ThemeToggle />
        </div>
        <Separator className="my-1" />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default NavigationPane;
