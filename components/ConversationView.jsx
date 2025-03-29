"use client";

import {
  Send,
  X,
  Paperclip,
  Copy,
  RefreshCw,
  MoreVertical,
  StopCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

export function ConversationView({ bot }) {
  const [messages, setMessages] = React.useState([
    {
      id: "1",
      content: "Hello! How can I assist you today?",
      role: "assistant",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      content:
        "I need help with a project. Can you explain how to use React hooks?",
      role: "user",
      timestamp: "10:31 AM",
    },
    {
      id: "3",
      content:
        "React Hooks are functions that let you use state and other React features without writing a class. The most commonly used hooks are useState and useEffect.\n\nHere's a simple example of useState:\n\n```jsx\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nAnd here's how useEffect works for side effects:\n\n```jsx\nimport React, { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nWould you like me to explain any specific hook in more detail?",
      role: "assistant",
      timestamp: "10:32 AM",
    },
    {
      id: "4",
      content: "Can you show me how to upload files in a React application?",
      role: "user",
      timestamp: "10:35 AM",
    },
  ]);

  const [input, setInput] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const fileInputRef = React.useRef(null);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() && files.length === 0) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      files: files.length
        ? files.map((file) => ({
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
          }))
        : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFiles([]);
    simulateAIResponse();
  };

  const simulateAIResponse = () => {
    setIsGenerating(true);

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      content: "",
      role: "assistant",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "generating",
    };

    setMessages((prev) => [...prev, assistantMessage]);

    const responseText =
      "I'd be happy to show you how to handle file uploads in React! Here's a simple example using the File API:\n\n```jsx\nimport React, { useState } from 'react';\n\nfunction FileUploader() {\n  const [selectedFile, setSelectedFile] = useState(null);\n  const [isFilePicked, setIsFilePicked] = useState(false);\n\n  const changeHandler = (event) => {\n    setSelectedFile(event.target.files[0]);\n    setIsFilePicked(true);\n  };\n\n  const handleSubmission = () => {\n    const formData = new FormData();\n    formData.append('file', selectedFile);\n    \n    fetch('https://your-api-endpoint.com/upload', {\n      method: 'POST',\n      body: formData,\n    })\n      .then((response) => response.json())\n      .then((result) => {\n        console.log('Success:', result);\n      })\n      .catch((error) => {\n        console.error('Error:', error);\n      });\n  };\n\n  return (\n    <div>\n      <input type=\"file\" name=\"file\" onChange={changeHandler} />\n      {isFilePicked ? (\n        <div>\n          <p>Filename: {selectedFile.name}</p>\n          <p>Filetype: {selectedFile.type}</p>\n          <p>Size in bytes: {selectedFile.size}</p>\n        </div>\n      ) : (\n        <p>Select a file to show details</p>\n      )}\n      <div>\n        <button onClick={handleSubmission}>Submit</button>\n      </div>\n    </div>\n  );\n}\n\nexport default FileUploader;\n```\n\nThis component allows users to select a file, displays information about the selected file, and provides a button to upload it to a server. You can extend this to support multiple files by modifying the state and handlers accordingly.\n\nWould you like me to explain any specific part of this code in more detail?";

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < responseText.length) {
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.status === "generating") {
            lastMessage.content += responseText.charAt(i);
          }
          return updated;
        });
        i++;
      } else {
        clearInterval(typingInterval);
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.status === "generating") {
            lastMessage.status = "sent";
          }
          return updated;
        });
        setIsGenerating(false);
      }
    }, 10);
  };

  const handleStopGenerating = () => {
    setIsGenerating(false);
    setMessages((prev) => {
      const updated = [...prev];
      const lastMessage = updated[updated.length - 1];
      if (lastMessage.status === "generating") {
        lastMessage.status = "sent";
        lastMessage.content += " [generation stopped]";
      }
      return updated;
    });
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateResponse = () => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage.role === "assistant") {
        return prev.slice(0, -1);
      }
      return prev;
    });
    simulateAIResponse();
  };

  const formatMessageContent = (content) => {
    const parts = content.split("```");
    if (parts.length === 1)
      return <p className="whitespace-pre-wrap">{content}</p>;

    return (
      <div className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          if (index % 2 === 0) {
            return <p key={index}>{part}</p>;
          } else {
            const lines = part.split("\n");
            const language = lines[0];
            const code = lines.slice(1).join("\n");

            return (
              <div
                key={index}
                className="my-2 rounded-md bg-muted p-3 relative group"
              >
                {language && (
                  <div className="text-xs text-muted-foreground mb-2">
                    {language}
                  </div>
                )}
                <pre className="text-sm overflow-x-auto">{code}</pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={bot.avatar} alt={bot.name} />
            <AvatarFallback>{bot.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-base font-medium">{bot.name}</h2>
            <p className="text-xs text-muted-foreground flex items-center">
              <span
                className={`mr-1.5 h-2 w-2 rounded-full ${
                  bot.status === "online" ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></span>
              {bot.status === "online" ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>New Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Clear conversation</DropdownMenuItem>
              <DropdownMenuItem>Export chat</DropdownMenuItem>
              <DropdownMenuItem>Bot settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end": message.role === "user",
              "justify-start": message.role === "assistant",
            })}
          >
            <div
              className={cn("max-w-[80%] rounded-lg p-4", {
                "bg-primary text-primary-foreground": message.role === "user",
                "bg-muted": message.role === "assistant",
              })}
            >
              {message.files && message.files.length > 0 && (
                <div className="mb-2 space-y-2">
                  {message.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-md bg-background/50 p-2 text-xs"
                    >
                      <Paperclip className="mr-2 h-4 w-4" />
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate font-medium">{file.name}</p>
                        <p className="text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {message.status === "generating" ? (
                <div>
                  {formatMessageContent(message.content)}
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
                </div>
              ) : (
                formatMessageContent(message.content)
              )}

              {message.role === "assistant" &&
                message.status !== "generating" && (
                  <div className="mt-2 flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(message.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={regenerateResponse}
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                )}

              <div
                className={cn("mt-1 text-right text-xs", {
                  "text-primary-foreground/70": message.role === "user",
                  "text-muted-foreground": message.role === "assistant",
                })}
              >
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {files.length > 0 && (
        <div className="border-t p-2">
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center rounded-md bg-muted p-2 text-xs"
              >
                <Paperclip className="mr-2 h-4 w-4" />
                <div className="mr-2">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <Textarea
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[80px] resize-none pr-10"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2"
              onClick={handleFileUpload}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          {isGenerating ? (
            <Button variant="destructive" onClick={handleStopGenerating}>
              <StopCircle className="mr-2 h-4 w-4" />
              Stop
            </Button>
          ) : (
            <Button onClick={handleSendMessage}>
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
