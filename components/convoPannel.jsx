"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/AppProvider";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const convoPannel = () => {
  const { aiContacts, selectedAIContact, setSelectedAIContact, user } =
    useAppContext();
  const router = useRouter();
  const { id } = useParams();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

  // Fetch conversation when bot is selected
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
    if (!selectedAIContact || !user) return;
    if (!message.trim() && !selectedFile) return;
    if (selectedFile && !message.trim()) {
      alert("Please add a message to explain the file");
      return;
    }

    try {
      let BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001"; // Fallback for local dev

      let convId = conversation?._id;
      if (!convId) {
        const convResponse = await axios.post(
          `${BACKEND_URL}/api/conversations`,
          { userId: user._id, botId: selectedAIContact._id },
          { withCredentials: true }
        );
        convId = convResponse.data._id;
        setConversation(convResponse.data);
      }

      const formData = new FormData();
      formData.append("conversationId", convId);
      formData.append("sender", "user");
      formData.append("textContent", message);
      if (selectedFile) formData.append("file", selectedFile);

      const messageResponse = await axios.post(
        "http://localhost:3001/api/messages",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { userMessage, botMessage } = messageResponse.data;
      setMessages((prev) => [...prev, userMessage, botMessage]);
      setMessage("");
      setSelectedFile(null);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  if (!selectedAIContact) {
    return (
      <div className="text-center text-gray-500 dark:text-neutral-400">
        Loading...
      </div>
    );
  }

  return <div>convoPannel</div>;
};

export default convoPannel;
