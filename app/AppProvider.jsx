"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import axios from "axios";
import { auth } from "@/app/firebase/config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";

// Set axios to include credentials globally for HTTP-only cookies
axios.defaults.withCredentials = true;

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

  useEffect(() => {
    console.log("[Data Updater] Initializing Firebase auth state listener...");

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("[Auth State] Authentication state changed.");

      if (firebaseUser) {
        console.log(`[Auth State] User signed in. UID: ${firebaseUser.uid}`);

        try {
          console.log("[Auth Token] Fetching fresh ID token...");
          const idToken = await firebaseUser.getIdToken();
          console.log("[Auth Token] ID Token retrieved successfully.");

          console.log(
            "[Backend Verification] Sending token to backend for validation..."
          );
          const response = await axios.get(`${BACKEND_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${idToken}` },
          });
          console.log(response);

          console.log(
            "[Backend Verification] Token verified. Updating user state..."
          );
          console.log("Setting user");
          console.log(response.data.user);
          setUser(response.data.user);

          console.log(
            "[Data Updater] Fetching bots and recent conversations..."
          );
          fetchBots();
          fetchRecentConversations();
        } catch (error) {
          console.error(
            "[Backend Verification] Token verification failed:",
            error
          );
          console.log(
            "[Auth State] Logging out user due to verification failure."
          );
          handleLogout();
        }
      } else {
        console.warn("[Auth State] No user detected. Logging out...");
        handleLogout();
      }

      setLoading(false);

      // Log state values at the end
      console.log("[State Logger] Current State Values:");
      console.log("[State Logger] user:", user);
      console.log("[State Logger] aiContacts:", aiContacts);
      console.log("[State Logger] selectedAIContact:", selectedAIContact);
      console.log("[State Logger] recentChatContacts:", recentChatContacts);

      console.log("[Data Updater] Authentication state processing complete.");
    });

    return () => {
      console.log("[Data Updater] Cleaning up Firebase auth listener...");
      unsubscribe();
    };
  }, []); // Added dependencies for logging updates

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

    console.log(
      "[Conversation Fetcher] Fetching recent conversations for user:",
      user._id
    );

    try {
      console.log("[Conversation Fetcher] Requesting new ID token...");
      const idToken = await auth.currentUser?.getIdToken();

      const requestUrl = `${BACKEND_URL}/api/conversations/user/${user._id}`;
      console.log("[Conversation Fetcher] Sending GET request to:", requestUrl);

      const response = await axios.get(requestUrl, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      console.log(
        "[Conversation Fetcher] Response received. Status:",
        response.status
      );
      console.log(
        "[Conversation Fetcher] Raw Conversations Data:",
        JSON.stringify(response.data, null, 2)
      );

      const formattedConversations = response.data.map((conv) => ({
        botId: conv.bot._id,
        lastMessage: conv.messages.length
          ? conv.messages[conv.messages.length - 1].content
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

  const login = async (email, password) => {
    try {
      console.log("Attempting login...");
      console.log("Email:", email);

      // Sign in with Firebase
      console.log("Signing in with Firebase...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //this user contains all data about thelooged user
      const user = userCredential.user;
      console.log("Firebase authentication successful:", user);

      console.log("Fetching Firebase ID token...");
      const idToken = await user.getIdToken();
      console.log("ID Token received:", idToken);

      // Pass the Firebase ID token to your Express login endpoint
      console.log("Sending login request to backend...");
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        idToken,
      });
      const data = response.data;
      console.log("Login response from backend:", data);

      // Set user state and proceed with app initialization
      console.log("Setting user state...");
      setUser(data.user);

      console.log("Fetching bots...");
      fetchBots();

      console.log("Fetching recent conversations...");
      fetchRecentConversations();

      console.log("Login process completed successfully.");
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  // const logout = () => {
  //   setUser(null);
  //   setAIContacts([]);
  //   setSelectedAIContact(null);
  //   setRecentChatContacts([]);
  // };
  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      await axios.post(`${BACKEND_URL}/api/auth/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAIContacts([]);
      setSelectedAIContact(null);
      setRecentChatContacts([]);
    }
  };

  // Add authorization header to all requests if logged in
  useEffect(() => {
    console.log("[useEffect] Setting up Axios request interceptor...");

    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        console.log("[Axios Interceptor] Intercepting request:", config.url);

        if (auth.currentUser) {
          try {
            console.log("[Axios Interceptor] Fetching Firebase ID token...");
            const token = await auth.currentUser.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
            console.log(
              "[Axios Interceptor] Token attached to request headers."
            );
          } catch (error) {
            console.error("[Axios Interceptor] Error fetching token:", error);
          }
        } else {
          console.warn("[Axios Interceptor] No authenticated user found.");
        }

        return config;
      },
      (error) => {
        console.error("[Axios Interceptor] Request error:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      console.log("[useEffect] Ejecting Axios request interceptor...");
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // // Add useEffect for initial auth check
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get(`${BACKEND_URL}/api/auth/me`);
  //       setUser(response.data.user);
  //       fetchBots();
  //       fetchRecentConversations();
  //     } catch (error) {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []); // Run once on mount
  // Firebase auth state listener

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
