import * as React from "react";
import { cn } from "@/lib/utils";
import { MessageActions } from "./MessageActions";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAppContext } from "@/app/AppProvider";
export function MessageBubble({
  id,
  content,
  role,
  timestamp,
  isBookmarked,
  reactions,
  status,
  onBookmark,
  onReaction,
  onCopy,
  onRegenerate,
  className,
  textToCopy,
}) {
  const senderName = role === "user" ? "You" : "Assistant";
  const senderInitial = senderName.substring(0, 1);
  const senderRowAlignment = role === "user" ? "flex-row-reverse" : "";

  const { user } = useAppContext();

  return (
    <div
      className={cn(
        "flex flex-col group",
        role === "user" ? "items-end" : "items-start",
        className
      )}
    >
      {/* Sender Info Row */}
      <div className={`flex items-center gap-2 ${senderRowAlignment} mb-1`}>
        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-muted border border-border/50 flex items-center justify-center text-muted-foreground text-xs">
          {senderInitial}
        </div>
        {/* <Avatar className="h-6 w-6 rounded-full">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.avatar}`}
            alt={user.username}
          />
          <AvatarFallback>{user.username?.charAt(0) || "P"}</AvatarFallback>
        </Avatar> */}
        <span className="text-xs text-muted-foreground">{senderName}</span>
        <span className="text-xs text-muted-foreground/60">{timestamp}</span>
      </div>

      {/* Bubble Container */}
      <div
        className={`flex max-w-full ${
          role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={cn(
            "max-w-[100%] md:max-w-2xl py-2 px-4 rounded-lg relative",
            role === "user"
              ? "bg-chat-bubble-outgoing text-chat-bubble-outgoing-foreground rounded-tr-none"
              : "bg-chat-bubble-incoming text-chat-bubble-incoming-foreground rounded-tl-none",
            "shadow-sm transition-colors duration-150"
          )}
        >
          {/* Bookmark indicator */}
          {isBookmarked && (
            <div className="absolute -top-2 -right-2 text-yellow-500">
              <Bookmark className="h-4 w-4 fill-current" />
            </div>
          )}

          {/* Message content */}
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-pre:my-2">
            <p className="whitespace-pre-wrap break-words">{content}</p>
          </div>

          {/* Message reactions */}
          {reactions?.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {reactions.map((emoji, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center rounded-full bg-background px-1.5 py-0.5 text-xs"
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}

          {/* Message actions */}
          <div className="mt-1 flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <MessageActions
              id={id}
              role={role}
              isBookmarked={isBookmarked}
              onBookmark={onBookmark}
              onReaction={onReaction}
              onCopy={onCopy}
              onRegenerate={onRegenerate}
              textToCopy={textToCopy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
