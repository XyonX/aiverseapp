"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { v4 as uuidv4 } from "uuid";

const AppContext = createContext();

export function AppProvider({ children }) {
  const defaultBots = [
    {
      id: "unique-id-123",
      name: "Grok",
      apiKey: "sk-xyz...",
      endpoint: "https://api.xai.com/v1/chat",
      model: "grok-3",
      avatar: "/avatars/grok.png",
      lastInteraction: "2025-02-21T10:00:00Z",
      chatHistory: [
        {
          id: "msg-001",
          sender: "user",
          content: "Hey, how’s it going?",
          timestamp: "2025-02-21T09:59:00Z",
        },
        {
          id: "msg-002",
          sender: "ai",
          content: "Doing great, thanks! How about you?",
          timestamp: "2025-02-21T09:59:30Z",
        },
      ],
    },
  ];

  // AI Contacts State
  const [aiContacts, setAIContacts] = useState([]);

  // Tab State
  const [selectedTab, setSelectedTab] = useState("chats"); // Default tab

  // Load AI contacts from localStorage on mount
  useEffect(() => {
    try {
      const storedContacts =
        JSON.parse(localStorage.getItem("aiContacts")) || [];
      setAIContacts([...defaultBots, ...storedContacts]);
    } catch (error) {
      console.error("Error loading AI contacts from localStorage:", error);
      setAIContacts(defaultBots);
    }
  }, []);

  // Update localStorage whenever aiContacts change
  useEffect(() => {
    if (aiContacts.length > 0) {
      try {
        localStorage.setItem("aiContacts", JSON.stringify(aiContacts));
      } catch (error) {
        console.error("Error saving AI contacts to localStorage:", error);
      }
    }
  }, [aiContacts]);

  // Add a new AI contact
  const addAI = (newAI) => {
    setAIContacts((prev) => [
      ...prev,
      { ...newAI, id: uuidv4(), chatHistory: [] },
    ]);
  };

  // Update chat history for a specific AI contact
  const updateChatHistory = (aiId, message, response) => {
    setAIContacts((prev) =>
      prev.map((ai) => {
        if (ai.id === aiId) {
          const timestamp = new Date().toISOString();
          return {
            ...ai,
            chatHistory: [
              ...ai.chatHistory,
              { id: uuidv4(), sender: "user", content: message, timestamp },
              { id: uuidv4(), sender: "ai", content: response, timestamp },
            ],
            lastInteraction: timestamp,
          };
        }
        return ai;
      })
    );
  };

  return (
    <AppContext.Provider value={{ aiContacts, addAI, updateChatHistory }}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
