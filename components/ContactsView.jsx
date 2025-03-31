"use client";

import React from "react";
import { UserPlus, MoreHorizontal } from "lucide-react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBot } from "@/context/BotContext";
import { useAppContext } from "@/app/AppProvider";

export function ContactsView({ bots, onBotClick }) {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  const { aiContacts } = useAppContext();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { selectedBot } = useBot();

  const filteredBots = bots.filter((bot) =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = aiContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">Contacts</div>
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
        <SidebarInput
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <div className="divide-y">
              {filteredContacts.map((bot) => (
                <div
                  key={bot.id}
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer ${
                    selectedBot && selectedBot.id === bot.id
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : ""
                  }`}
                  onClick={() => onBotClick(bot)}
                >
                  <div className="flex items-center">
                    <div className="relative">
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
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">{bot.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {bot.status === "online" ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Start Chat</DropdownMenuItem>
                      <DropdownMenuItem>Block Contact</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
}
