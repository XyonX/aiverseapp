export function GeneratingIndicator() {
  return (
    <div className="mt-2 flex items-center">
      <div className="flex space-x-1">
        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}
