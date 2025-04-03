"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlockMessage({ content, onCopy }) {
  // Simple formatting for code blocks
  const parts = content.split("```");
  if (parts.length === 1)
    return <p className="whitespace-pre-wrap">{content}</p>;

  return (
    <div className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        // Even indices are normal text, odd indices are code blocks
        if (index % 2 === 0) {
          return <p key={index}>{part}</p>;
        } else {
          // Extract language if specified (e.g., ```jsx)
          const lines = part.split("\n");
          const language = lines[0];
          const code = lines.slice(1).join("\n");

          return (
            <div
              key={index}
              className={cn(
                "my-2 rounded-md p-3 relative group",
                "bg-background/50 dark:bg-background/20"
              )}
            >
              {language && (
                <div className="text-xs text-muted-foreground mb-2">
                  {language}
                </div>
              )}
              {code}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onCopy?.(code)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          );
        }
      })}
    </div>
  );
}
