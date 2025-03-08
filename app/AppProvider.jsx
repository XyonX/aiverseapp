"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import axios from "axios";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
// import { verify } from "jsonwebtoken";

// Set axios to include credentials globally for HTTP-only cookies
axios.defaults.withCredentials = true;

const AppContext = createContext();

export function AppProvider({ children }) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

  const [user, setUser] = useState(null);
  const [aiContacts, setAIContacts] = useState([]);
  const [selectedAIContact, setSelectedAIContact] = useState(null);
  const [recentChatContacts, setRecentChatContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("chats");

  const fetchBots = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bots`);
      setAIContacts(response.data);
      console.log(response.data); // Log immediate data
    } catch (error) {
      console.error("Error fetching bots:", error);
    }
  };

  const fetchRecentConversations = async () => {
    if (!user) {
      console.log("Usert not loggeed in");
      return;
    }
    try {
      console.log("Usert  loggeed in");
      const response = await axios.get(
        `${API_BASE_URL}/api/conversations/user/${user._id}`
      );
      setRecentChatContacts(
        response.data.map((conv) => ({
          botId: conv.bot._id,
          lastMessage: conv.messages.length
            ? conv.messages[conv.messages.length - 1].content
            : "No messages yet",
          time: conv.lastMessageTimestamp,
          botName: conv.bot.name,
          botAvatar: conv.bot.avatar,
        }))
      );
    } catch (error) {
      console.error("Error fetching recent conversations:", error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });
      const data = response.data;
      setUser(data.user);
      fetchBots();
      fetchRecentConversations();
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setAIContacts([]);
    setSelectedAIContact(null);
    setRecentChatContacts([]);
  };

  // Add useEffect for initial auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`);
        setUser(response.data.user);
        fetchBots();
        fetchRecentConversations();
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // Run once on mount

  useEffect(() => {
    if (user) {
      fetchBots();
      fetchRecentConversations(); // Uncommented for consistency
    }
  }, [user]);

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <AppContext.Provider
      value={{
        aiContacts,
        activeTab,
        changeTab,
        selectedAIContact,
        setSelectedAIContact,
        recentChatContacts,
        setRecentChatContacts,
        user,
        login,
        logout,
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
