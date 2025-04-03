"use client";
import { Copy, RefreshCw, Share2, Smile, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sampleEmojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "🥳",
  "😏",
];

export function MessageActions({
  id,
  role,
  isBookmarked,
  onBookmark,
  onReaction,
  onCopy,
  onRegenerate,
  textToCopy = "",
}) {
  return (
    <div
      className={cn(
        "absolute -top-10 right-0 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100",
        { "left-0 right-auto": role === "bot" }
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="icon" className="h-7 w-7">
            <Smile className="h-3.5 w-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2" align="center">
          <div className="grid grid-cols-8 gap-1">
            {sampleEmojis.map((emoji, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={() => onReaction?.(id, emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="secondary"
        size="icon"
        className="h-7 w-7"
        onClick={() => onBookmark?.(id)}
      >
        <Bookmark
          className={cn("h-3.5 w-3.5", {
            "fill-current": isBookmarked,
          })}
        />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="h-7 w-7"
        onClick={() => onCopy?.(textToCopy)}
      >
        <Copy className="h-3.5 w-3.5" />
      </Button>

      {role === "bot" && onRegenerate && (
        <Button
          variant="secondary"
          size="icon"
          className="h-7 w-7"
          onClick={onRegenerate}
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
      )}

      <Button variant="secondary" size="icon" className="h-7 w-7">
        <Share2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
