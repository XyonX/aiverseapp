"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

import Prism from "prismjs";
import { useEffect } from "react";
import "../../app/prism-material-light.css";

require("prismjs/components/prism-javascript");
require("prismjs/components/prism-css");
require("prismjs/components/prism-jsx");

export function CodeBlockMessage({ content, onCopy }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  const parts = content.split("```");
  if (parts.length === 1)
    return (
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
        {content}
      </p>
    );

  return (
    <div className="whitespace-pre-wrap text-sm text-foreground">
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          return (
            <p key={index} className="my-2 leading-relaxed">
              {part}
            </p>
          );
        } else {
          const lines = part.split("\n");
          const language = lines[0];
          const code = lines.slice(1).join("\n");

          return (
            <div
              key={index}
              className={cn(
                "my-4 rounded-lg relative group",
                "bg-muted/50 dark:bg-muted/80",
                "border border-border shadow-sm"
              )}
            >
              <div className="p-4 space-y-2">
                {language && (
                  <div className="text-xs font-mono text-muted-foreground/80">
                    {language}
                  </div>
                )}
                <pre className="overflow-x-auto font-mono text-sm leading-relaxed">
                  <code className={` inline-block min-w-full`}>{code}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "absolute top-2 right-2 opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-150 h-4 w-4",
                    "text-muted-foreground hover:text-foreground bg-muted/70"
                  )}
                  onClick={() => onCopy?.(code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
