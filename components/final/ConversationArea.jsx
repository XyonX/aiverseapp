"use client";
import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
import { useAppContext } from "@/app/AppProvider";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import TextBubble from "@/components/MessageBubbles/TextBubble";
import ImageBubble from "@/components/MessageBubbles/ImageBubble";
import ThinkingBubble from "@/components/MessageBubbles/ThinkingBubble";
import { ConversationView } from "@/components/ConversationView";

import {
  Send,
  X,
  Paperclip,
  Copy,
  RefreshCw,
  MoreVertical,
  StopCircle,
  Mic,
  Image,
  Smile,
  Bookmark,
  Star,
  Trash,
  Download,
  Share2,
  Volume2,
  Maximize2,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageContainer } from "@/components/messages/MessageContainer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import DiscoverView from "@/components/DiscoverView";
// Sample emojis for the emoji picker
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
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "🤗",
  "🤔",
  "🤭",
  "🤫",
  "🤥",
  "😶",
  "😐",
  "😑",
  "😬",
  "🙄",
  "😯",
  "😦",
  "😧",
  "😮",
  "😲",
  "🥱",
  "😴",
  "🤤",
  "😪",
  "😵",
  "🤐",
  "🥴",
  "🤢",
  "🤮",
  "🤧",
  "😷",
  "🤒",
  "🤕",
];

const ConversationArea = () => {
  //helper fucntion
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  //01 getting data from context api
  const { aiContacts, selectedAIContact, setSelectedAIContact, user } =
    useAppContext();
  //getting router to redirect
  const router = useRouter();
  //getting id or hte chatbot endpoint to get requested bot from all aicontacts
  const { id } = useParams();

  //02 state declaration
  //varibale that will store data
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isBotThinking, setIsBotThinking] = useState(false);

  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [files, setFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  // Fallback for local dev

  // 02 Fetch conversation when bot is selected
  useEffect(() => {
    if (!id || !user) return;

    const bot = aiContacts.find((bot) => bot._id === id);
    if (bot) {
      setSelectedAIContact(bot);
      fetchConversation(bot._id);
    } else {
      router.push("/chat");
    }
  }, [id, user, aiContacts, setSelectedAIContact, router]);

  const fetchConversation = async (botId) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/conversations/user/${user._id}/bot/${botId}`,
        { withCredentials: true }
      );
      if (response.data) {
        setConversation(response.data);
        setMessages(response.data.messages || []);
      } else {
        setConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    //error check
    if (!selectedAIContact && !user) {
      console.log("select bot or login");
    }
    if (!message.trim() && !selectedFile) {
      console.warn(
        "[Message Sender] Empty message and no file attached. Exiting function."
      );
      return;
    }
    if (selectedFile && !message.trim()) {
      alert("Please add a message to explain the file");
      console.warn("[Message Sender] File attached but no message provided.");
      return;
    }
    //01 chckign if conversation between user nad bopt exist
    let convId = conversation?._id;
    if (!convId) {
      console.log(
        "[Message Sender] No existing conversation. Creating a new one..."
      );
      const convResponse = await axios.post(
        `${BACKEND_URL}/api/conversations`,
        {
          userId: user._id,
          botId: selectedAIContact,
        }
      );
      setConversation(convResponse.data);
      convId = conversation._id;
      console.log("[Message Sender] New conversation created with ID:", convId);
    } else {
      console.log("[Message Sender] Using existing conversation ID:", convId);
    }

    //02 Create temporary user message
    const tempId = `temp-${Date.now()}`;
    const tempUserMessage = {
      _id: tempId,
      conversation: conversation?._id,
      sender: "user",
      textContent: message,
      type: "text",
      timestamp: new Date(),
      isTemporary: true,
      ...(selectedFile && { file: selectedFile }),
    };

    //03 updating allmessage prop to trigger ui refresh
    setMessages((prev) => [...prev, tempUserMessage]);

    setMessage("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsBotThinking(true);

    //04 prepare form data
    const formData = new FormData();
    formData.append("conversationId", convId);
    formData.append("textContent", message);
    formData.append("userId", user._id);
    formData.append("tempUserMessageId", tempId);
    if (selectedFile) formData.append("file", selectedFile);

    console.log("[Message Sender] Sending message data:", {
      conversationId: convId,
      textContent: message,
      hasFile: !!selectedFile,
    });

    if (selectedAIContact.streamingEnabled) {
      console.log("Streaming is enables");
      const response = await fetch(`${BACKEND_URL}/api/messages`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok || !response.body) {
        console.error("Streaming request failed");
        return;
      }

      const reader = response.body.getReader();

      let buffer = "";
      let botMessageId = `bot-temp-${Date.now()}`;
      const decoder = new TextDecoder();

      console.log("Starting to read stream...");

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process streamed events line-by-line
        const parts = buffer.split("\n\n");
        buffer = parts.pop(); // Keep unfinished chunk for the next iteration

        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;

          try {
            const data = JSON.parse(part.slice(6));
            console.log("[Mock Stream] Processing event:", data.type);

            switch (data.type) {
              case "init":
                setMessages((prev) => [
                  ...prev.filter((msg) => msg._id !== tempId),
                  data.userMessage,
                  { ...data.botMessage, textContent: "", isThinking: true },
                ]);
                botMessageId = data.botMessage._id;
                setIsBotThinking(false);
                break;

              case "chunk":
                if (botMessageId) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg._id === botMessageId
                        ? {
                            ...msg,
                            textContent: msg.textContent + data.content,
                            isThinking: false,
                          }
                        : msg
                    )
                  );
                }
                break;

              case "complete":
                if (botMessageId) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg._id === botMessageId
                        ? { ...data.botMessage, isTemporary: false }
                        : msg
                    )
                  );
                }
                setIsBotThinking(false);
                break;

              case "error":
                setMessages((prev) =>
                  prev.filter(
                    (msg) => msg._id !== tempId && msg._id !== botMessageId
                  )
                );
                alert(`Error: ${data.message}`);
                setIsBotThinking(false);
                break;
            }
          } catch (error) {
            console.error("[Mock Stream] Error processing event:", error);
          }
        }
      }

      // const decoder = new TextDecoder();
      // let buffer = "";

      // console.log("Starting to read stream...");

      // while (true) {
      //   const { done, value } = await reader.read();
      //   if (done) {
      //     console.log("Stream finished.");
      //     break;
      //   }

      //   const chunk = decoder.decode(value, { stream: true });
      //   buffer += chunk;
      //   console.log("Received chunk:", chunk);
      // }

      // console.log("Final response:", buffer);
    } else {
      // Non-streaming handling
      console.log(
        "[Message Sender] AI does not support streaming. Sending standard request..."
      );
      const response = await axios.post(
        `${BACKEND_URL}/api/messages`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(
        "[Message Sender] Non-streaming response received:",
        response.data
      );

      const { userMessage, botMessage } = response.data;
      console.log("[Message Sender] Updating messages with bot response...");

      setMessages((prev) => [
        ...prev.filter((msg) => msg._id !== tempId),
        userMessage,
        botMessage,
      ]);
      setIsBotThinking(false);
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  if (!selectedAIContact) {
    router.push("/chat");
  }

  //message utility functioon

  const toggleBookmark = (messageId) => {
    console.log(`Message bookmarked for:${messageId}`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateResponse = () => {
    console.log("Regenerate message called");
  };

  // return <ConversationView bot={selectedAIContact} />;

  //conversation area
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Conversation header - Fixed at the top */}
      <div className="flex items-center justify-between border-b p-4 sticky top-0 bg-background z-10 left-0 right-0">
        <div className="flex items-center gap-3">
          {/* <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 mr-1"
            onClick={() => setSelectedAIContact(null)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button> */}
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={`${BACKEND_URL}/uploads/${selectedAIContact.avatar}`}
              alt={selectedAIContact.name}
            />
            <AvatarFallback>{selectedAIContact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium">
                {selectedAIContact.name}
              </h2>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Star className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span
                className={`mr-1.5 h-2 w-2 rounded-full ${
                  selectedAIContact.isOnline ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></span>
              {/* {isTyping && bot.status === "online"
                ? "Typing..."
                : bot.status === "online"
                ? "Online"
                : "Offline"} */}
              {selectedAIContact.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>New Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  // onClick={toggleFullscreen}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Fullscreen</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Clear conversation</DropdownMenuItem>
              <DropdownMenuItem>Export chat</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Bot settings</DropdownMenuItem>
              <DropdownMenuItem>Mute notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash className="h-4 w-4 mr-2" />
                Delete chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Messages area - Scrollable */}
      {/* <ScrollArea className="flex-1">
        <MessageContainer
          messages={messages}
          onBookmark={toggleBookmark}
          onCopy={copyToClipboard}
          onRegenerate={regenerateResponse}
        />
        {isBotThinking && (
          <ThinkingBubble
            userAvatar={user.avatar}
            botAvatar={selectedAIContact.avatar}
            sender={"bot"}
          />
        )}
        <div ref={messagesEndRef} />
      </ScrollArea> */}
      <div className="flex-1 h-full overflow-y-auto scrollbar-hide">
        {" "}
        {/* Handles scrolling */}
        {/* Inner container: Enforces max-width for message bubbles */}
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-4 md:pt-8 md:pb-6">
          {/* Padding adjusted */}
          <MessageContainer
            messages={messages}
            onBookmark={toggleBookmark}
            onCopy={copyToClipboard}
            onRegenerate={regenerateResponse}
          />
          {isBotThinking && (
            <ThinkingBubble
              userAvatar={user.avatar}
              botAvatar={selectedAIContact.avatar}
              sender={"bot"}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Fixed bottom section */}
      <div className="border-t bg-background sticky bottom-0 z-10">
        {/* Input area */}
        <div className="p-4">
          <div className="flex items-end gap-2">
            <div className="relative flex-1">
              <Textarea
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-[80px] resize-none pr-10 py-3 pl-3"
                disabled={isRecording}
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
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
                  className="h-8 w-8 rounded-full"
                  onClick={handleFileUpload}
                  disabled={isRecording}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      disabled={isRecording}
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-64 p-2"
                    align="end"
                    alignOffset={-40}
                  >
                    <Tabs defaultValue="emoji">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="emoji">Emoji</TabsTrigger>
                        <TabsTrigger value="stickers">Stickers</TabsTrigger>
                      </TabsList>
                      <TabsContent value="emoji" className="mt-2">
                        <div className="grid grid-cols-8 gap-1">
                          {sampleEmojis.map((emoji, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={() => setMessage((prev) => prev + emoji)}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="stickers" className="mt-2">
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-md bg-muted flex items-center justify-center"
                            >
                              <Image className="h-6 w-6 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full",
                    isRecording && "text-red-500"
                  )}
                  onClick={toggleRecording}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {isGenerating ? (
              <Button variant="destructive" onClick={handleStopGenerating}>
                <StopCircle className="mr-2 h-4 w-4" />
                Stop
              </Button>
            ) : (
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() && files.length === 0 && !isRecording}
              >
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationArea;
