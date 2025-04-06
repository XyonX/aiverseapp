import React from "react";
import ChatMessage from "./ChatMessage";

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

const ConversationArea = ({ messages = dummyMessages }) => {
  return (
    // Outer container: Handles scrolling and takes available space
    <div className="flex-1 h-full overflow-y-auto bg-background scrollbar-hide">
      <div className="flex flex-col">
        {/* chat bot header */}
        <div></div>
        {/* chat bubble area */}
        <div className="py-2">
          {/* Inner container: Enforces max-width and centers content */}
          <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
            {" "}
            {/* Adjusted max-width and padding */}
            {/* Message List */}
            <div className="flex flex-col gap-5 md:gap-6">
              {" "}
              {/* Increased gap between messages */}
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {/* Add Loading Skeleton or Empty State later */}
            </div>
          </div>
          {/* TODO: Add scroll-to-bottom button later */}
        </div>
        {/* input area */}
        <div></div>
      </div>
    </div>
  );
};

export default ConversationArea;
