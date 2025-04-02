"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import axios from "axios";
import { auth } from "@/app/firebase/config";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { registerUser, loginUser } from "./firebase/firebaseClient";

const AppContext = createContext();

export function AppProvider({ children }) {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const [user, setUser] = useState(null);
  const [aiContacts, setAIContacts] = useState([]);
  const [selectedAIContact, setSelectedAIContact] = useState(null);
  const [recentChatContacts, setRecentChatContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("chats");
  const [loading, setLoading] = useState(true);

  //for settings
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationSound, setNotificationSound] = useState("default");
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [dataSharing, setDataSharing] = useState(true);

  //firebase callback event effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const response = await axios.get(`${BACKEND_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${idToken}` },
          });
          setUser(response.data.user);
          fetchBots();
          fetchRecentConversations();
        } catch (error) {
          console.error("Token verification failed:", error);
          setError("Failed to verify user. Please try again."); // Don’t logout
        }
      } else {
        setUser(null); // Reset state without forcing logout
        setLoading(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchBots = async () => {
    console.log("[Bot Fetcher] Fetching bots from backend...");

    try {
      console.log(
        "[Bot Fetcher] Sending GET request to:",
        `${BACKEND_URL}/api/bots`
      );
      const response = await axios.get(`${BACKEND_URL}/api/bots`);

      console.log("[Bot Fetcher] Response received. Status:", response.status);
      console.log(
        "[Bot Fetcher] Bots Data:",
        JSON.stringify(response.data, null, 2)
      );

      setAIContacts(response.data);
      console.log("[State Updater] aiContacts updated successfully.");
    } catch (error) {
      console.error("[Bot Fetcher] Error fetching bots:", error);
    }
  };

  const fetchRecentConversations = async () => {
    if (!user) {
      console.warn("[Conversation Fetcher] No user found. Skipping fetch.");
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/conversations/user/${user._id}`
      );

      const formattedConversations = response.data.map((conv) => ({
        botId: conv.bot._id,
        lastMessage:
          conv.messages.length > 0
            ? conv.messages[0].textContent
            : "No messages yet",
        time: conv.lastMessageTimestamp,
        botName: conv.bot.name,
        botAvatar: conv.bot.avatar,
      }));

      setRecentChatContacts(formattedConversations);
      console.log(
        "[State Updater] recentChatContacts updated successfully:",
        JSON.stringify(formattedConversations, null, 2)
      );
    } catch (error) {
      console.error(
        "[Conversation Fetcher] Error fetching recent conversations:",
        error
      );
    }
  };
  const register = async (username, email, password) => {
    try {
      //register the user with firebase
      const user = registerUser(email, password);

      //get the ID token for secure backend communication
      const idToken = await user.getIdToken();

      //call the backend api to create custom user in db
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, //passing the idtoken
        },
        body: JSON.stringify({ username, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration Failed");
      }
      console.log("user register");
      return data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Allow caller to handle the error
    }
  };
  const login = async (email, password) => {
    try {
      //login to firebase
      const user = await loginUser(email, password);

      //get idToken for the backend
      const idToken = await user.getIdToken();

      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          message: "Demo login data",
        }),
      });

      if (!response.ok) {
        throw new Error(data.error || "Login Failed at backend");
      }
      console.log("User logined at backend");
    } catch (error) {
      console.error("Error while trying to login:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      // await axios.post(`${BACKEND_URL}/api/auth/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAIContacts([]);
      setSelectedAIContact(null);
      setRecentChatContacts([]);
    }
  };

  //axios interceptor to attach header
  // Add authorization header to all requests if logged in
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (auth.currentUser) {
          const token = await auth.currentUser.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => axios.interceptors.request.eject(requestInterceptor);
  }, []);

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
        register,
        logout: handleLogout,
        theme,
        setTheme,
        fontSize,
        setFontSize,
        notificationsEnabled,
        setNotificationsEnabled,
        notificationSound,
        setNotificationSound,
        profileVisibility,
        setProfileVisibility,
        dataSharing,
        setDataSharing,
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
