import * as React from "react";
import { cn } from "@/lib/utils";
import { MessageActions } from "./MessageActions";
import { MessageTimestamp } from "./MessageTimestamp";
import { Bookmark } from "lucide-react";

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
  return (
    <div
      className={cn(
        "flex group",
        role === "user" ? "justify-end" : "justify-start",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[85%] md:max-w-[75%] rounded-lg p-4 relative",
          role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {/* Bookmark indicator */}
        {isBookmarked && (
          <div className="absolute -top-2 -right-2 text-yellow-500">
            <Bookmark className="h-4 w-4 fill-current" />
          </div>
        )}

        {/* Message content */}
        {content}

        {/* Message reactions */}
        {reactions && reactions.length > 0 && (
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

        {/* Message timestamp */}
        <MessageTimestamp timestamp={timestamp} role={role} />
      </div>
    </div>
  );
}
