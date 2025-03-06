"use client";
// context/AIContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AIContext = createContext();

export function AIProvider({ children }) {
  const [aiContacts, setAIContacts] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("aiContacts")) || [];
    setAIContacts(storedContacts);
  }, []);

  // Sync to localStorage on update
  useEffect(() => {
    if (aiContacts.length > 0) {
      localStorage.setItem("aiContacts", JSON.stringify(aiContacts));
    }
  }, [aiContacts]);

  const addAI = (newAI) => {
    setAIContacts((prev) => [
      ...prev,
      { ...newAI, id: Date.now(), chatHistory: [] },
    ]);
  };

  const updateChatHistory = (aiId, message, response) => {
    setAIContacts((prev) =>
      prev.map((ai) => {
        if (ai.id === aiId) {
          const userMsg = {
            id: Date.now(),
            sender: "user",
            content: message,
            timestamp: new Date().toISOString(),
          };
          const aiMsg = {
            id: Date.now() + 1,
            sender: "ai",
            content: response,
            timestamp: new Date().toISOString(),
          };
          return {
            ...ai,
            chatHistory: [...ai.chatHistory, userMsg, aiMsg],
            lastInteraction: aiMsg.timestamp,
          };
        }
        return ai;
      })
    );
  };

  return (
    <AIContext.Provider value={{ aiContacts, addAI, updateChatHistory }}>
      {children}
    </AIContext.Provider>
  );
}

export const useAIContext = () => useContext(AIContext);
