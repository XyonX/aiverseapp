import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// interface VoiceMessageProps {
//   duration: string
//   role: "user" | "assistant"
// }

export function VoiceMessage({ duration, role }) {
  return (
    <div
      className={cn("flex items-center gap-2 rounded-md p-2", {
        "bg-primary/80": role === "user",
        "bg-background/50": role === "assistant",
      })}
    >
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <Volume2 className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded-full">
          <div className="h-1 w-1/3 bg-blue-500 rounded-full"></div>
        </div>
      </div>
      <span className="text-xs">{duration}</span>
    </div>
  );
}
