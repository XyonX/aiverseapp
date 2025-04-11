import React from "react";
import ChatMessage from "./ChatMessage";
import ChatHeader from "./ChatHeader"; // Import Header
import ChatInput from "./ChatInput"; // Import Input
import { SendHorizontal, Paperclip, Mic, Bot } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Dummy message data for now
const dummyMessages = [
  {
    id: "1",
    sender: "Bot (Gemini)",
    content: "Hi there! How can I help you today?",
    timestamp: "10:00 AM",
    isOutgoing: false,
  },
  {
    id: "2",
    sender: "You",
    content: "Hi",
    timestamp: "10:01 AM",
    isOutgoing: true,
  },
  {
    id: "3",
    sender: "You",
    content: "write me a code of simple jsx component example in next js",
    timestamp: "10:02 AM",
    isOutgoing: true,
  },
  {
    id: "4",
    sender: "Bot (Gemini)",
    content: "Okay, here's a very simple example...",
    code: `function Greeting({ name = "World" }) {\n  return (\n    <div>\n      <h1>Hello, {name}!</h1>\n    </div>\n  );\n}\nexport default Greeting;`,
    timestamp: "10:03 AM",
    isOutgoing: false,
  },
  {
    id: "5",
    sender: "You",
    content: "Thanks!",
    timestamp: "10:04 AM",
    isOutgoing: true,
  },
  // Add more messages to test scrolling
  {
    id: "6",
    sender: "Bot (Gemini)",
    content: "You are welcome! Let me know if you need anything else.",
    timestamp: "10:05 AM",
    isOutgoing: false,
  },
  {
    id: "7",
    sender: "You",
    content: "What is the capital of France?",
    timestamp: "10:06 AM",
    isOutgoing: true,
  },
  {
    id: "8",
    sender: "Bot (Gemini)",
    content: "The capital of France is Paris.",
    timestamp: "10:07 AM",
    isOutgoing: false,
  },
  {
    id: "9",
    sender: "You",
    content: "Tell me a short joke.",
    timestamp: "10:08 AM",
    isOutgoing: true,
  },
  {
    id: "10",
    sender: "Bot (Gemini)",
    content: "ok here",
    code: "\n// src/components/layout/AppLayout.tsx\nimport ServerList from './ServerList';\nimport ChannelList from './ChannelList';\nimport ChatView from './ChatView';\n// import MemberList from './MemberList'; // If implementing\n\nexport default function AppLayout() {\n  // State to manage member list visibility (example)\n  // const [isMemberListOpen, setIsMemberListOpen] = useState(true);\n\n  return (\n    // Main container, full screen height, flexbox row\n    <div className=\"flex h-screen w-screen text-white\">\n      {/* A. Server List */}\n      <ServerList />\n\n      {/* B. Channel List / User Panel */}\n      <ChannelList />\n\n      {/* C. Main Content Area */}\n      <ChatView /* toggleMemberList={() => setIsMemberListOpen(!isMemberListOpen)} */ />\n\n      {/* D. Member List (Conditional Rendering) */}\n      {/* {isMemberListOpen && <MemberList />} */}\n    </div>\n  );\n}\n",
    timestamp: "10:09 AM",
    isOutgoing: false,
  },
  {
    id: "11",
    sender: "You",
    content: "Haha, good one!",
    timestamp: "10:10 AM",
    isOutgoing: true,
  },
  {
    id: "12",
    sender: "Bot (Gemini)",
    content: "Glad you liked it!",
    timestamp: "10:11 AM",
    isOutgoing: false,
  },
];

const bot = {
  name: "gemini",
  endpoint: "",
  isActive: true,
};

const ConversationArea = ({
  initialMessages = dummyMessages,
  currentBot = bot, // Use default bot if none provided
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [isBotLoading, setIsBotLoading] = useState(false); // Example loading state
  const messagesEndRef = useRef(null); // Ref for scrolling

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle sending a message
  const handleSendMessage = async (text) => {
    console.log("Sending message:", text);

    // 1. Add user message immediately to the list
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "You",
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOutgoing: true,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // 2. Set loading state for input/bot response
    setIsBotLoading(true);

    // 3. Simulate bot response (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

    const botResponse = {
      id: `bot-${Date.now()}`,
      sender: "Bot (Gemini)",
      content: `Okay, I received: "${text}". Here is a simulated response.`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOutgoing: false,
      // Add code prop if applicable based on response
    };
    setMessages((prevMessages) => [...prevMessages, botResponse]);

    // 4. Turn off loading state
    setIsBotLoading(false);
  };
  return (
    // Outer container: Manages vertical layout of Header, Messages, Input
    // Takes available space, **DOES NOT SCROLL ITSELF**
    <div className="flex flex-col flex-1 h-full bg-background">
      {/* Chat Header (Fixed at Top) */}
      <ChatHeader bot={currentBot} />

      {/* Message List Area (Scrollable Middle Section) */}
      {/* THIS div handles the scrolling now */}
      <div className="flex-1 h-full overflow-y-auto scrollbar-hide">
        {" "}
        {/* Handles scrolling */}
        {/* Inner container: Enforces max-width for message bubbles */}
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-4 md:pt-8 md:pb-6">
          {" "}
          {/* Padding adjusted */}
          <div className="flex flex-col gap-5 md:gap-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {/* Add empty div at the end for scrollIntoView reference */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Chat Input (Fixed at Bottom) */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isBotLoading} />
    </div>
  );
};

export default ConversationArea;
