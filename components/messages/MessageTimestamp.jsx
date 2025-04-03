import { cn } from "@/lib/utils";

export function MessageTimestamp({ timestamp, role }) {
  return (
    <div
      className={cn("mt-1 text-right text-xs", {
        "text-primary-foreground/70": role === "user",
        "text-muted-foreground": role === "bot",
      })}
    >
      {timestamp}
    </div>
  );
}
