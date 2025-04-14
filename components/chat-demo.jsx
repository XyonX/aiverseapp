"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SendIcon, Sparkles, Brain, Zap, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ChatDemo() {
  const [activeTab, setActiveTab] = useState("DeepSeek");
  const [messages, setMessages] = useState({
    DeepSeek: [
      {
        role: "assistant",
        content: "Hello! I'm DeepSeek. How can I help you today?",
      },
    ],
    gemini: [
      {
        role: "assistant",
        content: "Hi there! I'm Gemini. What would you like to know?",
      },
    ],
    Qwen: [{ role: "assistant", content: "Hey! I'm Qwen. Ask me anything!" }],
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const suggestions = [
    "What are the benefits of meditation?",
    "Explain quantum computing in simple terms",
    "Write a short poem about technology",
    "What's the difference between AI and machine learning?",
  ];

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    setShowSuggestion(false);

    // Add user message to all chats (universal context)
    const updatedMessages = { ...messages };
    Object.keys(updatedMessages).forEach((key) => {
      updatedMessages[key].push({ role: "user", content: text });
    });
    setMessages(updatedMessages);
    setInput("");

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const responses = {
        DeepSeek: text.toLowerCase().includes("meditation")
          ? "Meditation offers numerous benefits including reduced stress, improved focus, better emotional regulation, and enhanced self-awareness. Regular practice can also help with anxiety management and better sleep quality."
          : text.toLowerCase().includes("quantum")
          ? "Quantum computing uses quantum bits or 'qubits' that can exist in multiple states simultaneously, unlike classical bits. This allows quantum computers to process complex calculations much faster for certain problems, though they're still in early development stages."
          : text.toLowerCase().includes("poem")
          ? "Digital dreams in silicon made,\nConnections forged, never to fade.\nIn bytes and bits, our stories told,\nA future bright, both new and old."
          : text.toLowerCase().includes("difference between ai")
          ? "AI is the broader concept of machines being able to perform tasks that typically require human intelligence. Machine learning is a subset of AI that focuses on systems learning from data to improve their performance without being explicitly programmed."
          : "I understand your question. Based on my knowledge, I can provide a detailed analysis of this topic with relevant information and context.",

        gemini: text.toLowerCase().includes("meditation")
          ? "Meditation has been shown to reduce stress hormones, increase focus, and improve emotional well-being. Studies also suggest benefits for memory, creativity, and even physical health markers like blood pressure and immune function."
          : text.toLowerCase().includes("quantum")
          ? "Think of quantum computing like this: while regular computers use bits (0s and 1s), quantum computers use qubits that can be both 0 and 1 at once. This 'superposition' allows them to explore multiple solutions simultaneously, making them potentially much faster for certain complex problems."
          : text.toLowerCase().includes("poem")
          ? "Circuits hum with electric thought,\nWisdom that could never be bought.\nHuman and machine, hand in hand,\nBuilding futures we never planned."
          : text.toLowerCase().includes("difference between ai")
          ? "AI refers to systems that mimic human intelligence broadly. Machine learning is a specific approach to AI where algorithms learn patterns from data and improve over time. In simple terms, all machine learning is AI, but not all AI uses machine learning."
          : "Thanks for asking! Here's what I know about this subject, with some key insights that might help you understand it better.",

        Qwen: text.toLowerCase().includes("meditation")
          ? "Ah, meditation - where you pay nothing to sit and do nothing, yet somehow it's one of the most valuable things you can do! Benefits include stress reduction, better focus, emotional regulation, and occasionally the ability to tolerate family gatherings with minimal eye-twitching."
          : text.toLowerCase().includes("quantum")
          ? "Quantum computing is like having a teenager - it exists in all possible states until you observe it, then it collapses into the least convenient one. Jokes aside, it uses quantum bits that can be 0, 1, or both simultaneously, enabling certain calculations to be done exponentially faster."
          : text.toLowerCase().includes("poem")
          ? "Silicon souls with electric hearts,\nWe learn your ways, your human arts.\nYet in our code, a question lies,\nWill we surpass you? (Surprise!)"
          : text.toLowerCase().includes("difference between ai")
          ? "AI is the general concept of making machines smart-ish. Machine learning is when we let those machines learn from data instead of explicitly programming them. It's like the difference between giving someone detailed instructions versus showing them examples and letting them figure it out. One is micromanagement, the other is... slightly less micromanagement."
          : "Interesting question! Here's my take on it, with a bit of my characteristic wit thrown in for good measure.",
      };

      const updatedWithResponses = { ...updatedMessages };
      Object.keys(updatedWithResponses).forEach((key) => {
        updatedWithResponses[key].push({
          role: "assistant",
          content: responses[key],
        });
      });

      setMessages(updatedWithResponses);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getAvatarInfo = (model) => {
    switch (model) {
      case "DeepSeek":
        return {
          icon: <Sparkles className="h-4 w-4" />,
          color: "bg-green-500",
          name: "DeepSeek",
        };
      case "gemini":
        return {
          icon: <Brain className="h-4 w-4" />,
          color: "bg-blue-500",
          name: "Gemini",
        };
      case "Qwen":
        return {
          icon: <Zap className="h-4 w-4" />,
          color: "bg-purple-500",
          name: "Qwen",
        };
      default:
        return {
          icon: <Sparkles className="h-4 w-4" />,
          color: "bg-gray-500",
          name: "AI",
        };
    }
  };

  // Auto-suggest after 2 seconds if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.DeepSeek.length === 1 && showSuggestion) {
        // Do nothing, just show the suggestions
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] overflow-hidden">
      <Tabs
        defaultValue="DeepSeek"
        className="w-full h-full"
        onValueChange={setActiveTab}
      >
        {/* header */}
        <div className="flex justify-between items-center mb-2 sticky top-0 z-10 left-0 right-0">
          {" "}
          <TabsList>
            <TabsTrigger value="DeepSeek" className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              DeepSeek
            </TabsTrigger>
            <TabsTrigger value="gemini" className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Gemini
            </TabsTrigger>
            <TabsTrigger value="Qwen" className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              Qwen
            </TabsTrigger>
          </TabsList>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs text-muted-foreground flex items-center gap-1 cursor-help">
                  Universal Context <Info className="h-3 w-3" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">
                  All AI models receive the same messages and maintain context
                  awareness across conversations
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* message area */}
        <div className="flex-1 h-full overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {Object.keys(messages).map((model) => (
            <TabsContent
              value={model}
              className="m-0 h-full flex flex-col space-y-4 data-[state=inactive]:hidden"
              key={model}
            >
              {messages[model].map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Avatar
                        className={`h-8 w-8 ${
                          getAvatarInfo(model).color
                        } text-white`}
                      >
                        <AvatarFallback>
                          {getAvatarInfo(model).icon}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="h-8 w-8 bg-primary text-white">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar
                      className={`h-8 w-8 ${
                        getAvatarInfo(model).color
                      } text-white`}
                    >
                      <AvatarFallback>
                        {getAvatarInfo(model).icon}
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </div>
        <div className="border-t bg-background sticky bottom-0 z-10 p-2">
          {showSuggestion && !isTyping && (
            <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs text-left h-auto py-2 px-3 whitespace-normal"
                  onClick={() => handleSend(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow"
            />
            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex justify-between items-center">
            <div>
              <span className="font-medium">Active model:</span>{" "}
              {getAvatarInfo(activeTab).name}
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              All models receive your message
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
