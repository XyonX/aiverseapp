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

const NavigationPane = () => {
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
      className={`border-r ${
        isMobile ? "!w-[60px]" : "!w-[calc(var(--sidebar-width-icon)_+_1px)]"
      }`}
    >
      <SidebarHeader className={isMobile ? "p-2" : ""}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className={`md:h-8 md:p-0 ${
                isMobile ? "justify-center p-0" : ""
              }`}
            >
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                {!isMobile && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">ChatBot</span>
                    <span className="truncate text-xs">AI Messenger</span>
                  </div>
                )}
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
                      changeTab(item.title);
                      setOpen(true);
                      setSelectedAIContact(null);
                    }}
                    isActive={activeTab === item.title}
                    className={`${
                      isMobile ? "justify-center px-0" : "px-2.5 md:px-2"
                    }`}
                  >
                    <item.icon />
                    {!isMobile && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div
          className={`${isMobile ? "px-0" : "px-2"} py-1 flex justify-center`}
        >
          <ThemeToggle />
        </div>
        <Separator className="my-1" />
        <NavUser user={data.user} isMobile={isMobile} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default NavigationPane;
