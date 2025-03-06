// lib/defaultBots.js
export const defaultBots = [
  {
    id: "unique-id-123",
    name: "Grok",
    apiKey: process.env.GROK_API_KEY || "sk-xyz...", // Use env vars in production
    endpoint: "https://api.xai.com/v1/chat",
    model: "grok-3",
    avatar: "/ai/grok/grok.png",
    lastInteraction: "2025-02-21T10:00:00Z",
    chatHistory: [
      {
        sender: "Grok",
        message: "Hello! How can I assist you today?",
        timestamp: "2025-02-21T10:00:00Z",
      },
      {
        sender: "User",
        message: "Can you help me with coding?",
        timestamp: "2025-02-21T10:01:00Z",
      },
      {
        sender: "Grok",
        message: "Of course! What coding problem are you facing?",
        timestamp: "2025-02-21T10:02:00Z",
      },
    ],
  },
  {
    id: "unique-id-124",
    name: "Gemini",
    apiKey: process.env.GEMINI_API_KEY || "sk-xyz...",
    endpoint:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText",
    model: "gemini-pro",
    avatar: "/ai/google/gemini.png",
    lastInteraction: "2025-02-23T10:00:00Z",
    chatHistory: [
      {
        sender: "Gemini",
        message: "Greetings! What can I do for you?",
        timestamp: "2025-02-23T10:00:00Z",
      },
      {
        sender: "User",
        message: "Tell me about AI developments",
        timestamp: "2025-02-23T10:01:00Z",
      },
      {
        sender: "Gemini",
        message:
          "Recent AI developments include improved NLP and image recognition...",
        timestamp: "2025-02-23T10:02:00Z",
      },
    ],
  },
  {
    id: "unique-id-125",
    name: "GPT-3.5",
    apiKey: process.env.OPENAI_API_KEY || "sk-xyz...",
    endpoint: "https://api.openai.com/v1/chat/completions",
    model: "gpt-3.5-turbo",
    avatar: "/ai/openai/gpt.png",
    lastInteraction: null,
    chatHistory: [
      {
        sender: "GPT-3.5",
        message: "Hi there! Ready to chat?",
        timestamp: "2025-02-22T09:00:00Z",
      },
    ],
  },
  {
    id: "unique-id-126",
    name: "GPT-4",
    apiKey: process.env.OPENAI_API_KEY || "sk-xyz...",
    endpoint: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4-turbo",
    avatar: "/ai/openai/gpt.png",
    lastInteraction: null,
    chatHistory: [
      {
        sender: "GPT-4",
        message: "Hello! How may I assist you today?",
        timestamp: "2025-02-22T15:00:00Z",
      },
    ],
  },
];
