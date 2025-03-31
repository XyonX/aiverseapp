import { Paperclip, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FileMessage({ files }) {
  return (
    <div className="mb-2 space-y-2">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center rounded-md bg-background/50 p-2 text-xs"
        >
          <Paperclip className="mr-2 h-4 w-4" />
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-muted-foreground">{file.size}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
            <Download className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
