// src/components/chat/ChatHeader.tsx
import React from "react";
// Example using lucide-react icons, install it: npm install lucide-react
import { Bot, Settings } from "lucide-react"; // Or any icon library you prefer

// interface BotInfo {
//     name: string;
//     endpoint: string;
//     isActive: boolean;
// }

// interface ChatHeaderProps {
//     bot: BotInfo;
// }

const ChatHeader = ({ bot }) => {
  return (
    <div className="flex items-center justify-between flex-shrink-0 px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
      {/* Left side: Bot info */}
      <div className="flex items-center gap-3">
        <div className="p-1 rounded-full bg-primary/10 text-primary">
          {" "}
          {/* Optional coloured icon BG */}
          <Bot size={20} strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-semibold text-foreground capitalize">
          {bot.name}
        </h2>
        {/* Optional Status Indicator */}
        {bot.isActive && (
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            {/* <span className="text-xs text-muted-foreground">Active</span> */}
          </div>
        )}
      </div>

      {/* Right side: Actions (Optional - e.g., settings, clear chat) */}
      <div className="flex items-center gap-2">
        <button className="p-1 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
