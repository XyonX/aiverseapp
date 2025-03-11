"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/AppProvider";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import TextBubble from "@/components/MessageBubbles/TextBubble";
import ImageBubble from "@/components/MessageBubbles/ImageBubble";
import ThinkingBubble from "@/components/MessageBubbles/ThinkingBubble";

const NewChatPage = () => {
  const { aiContacts, selectedAIContact, setSelectedAIContact, user } =
    useAppContext();
  const router = useRouter();
  const { id } = useParams();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isBotThinking, setIsBotThinking] = useState(false);

  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages update
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  // Fallback for local dev

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
      console.log(`${BACKEND_URL}/api/auth/login`);

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
    if (!selectedAIContact || !user) {
      console.warn(
        "[Message Sender] No selected AI contact or user. Exiting function."
      );
      return;
    }
    if (!message.trim() && !selectedFile) {
      console.warn(
        "[Message Sender] Empty message and no file attached. Exiting function."
      );
      return;
    }
    if (selectedFile && !message.trim()) {
      alert("Please add a message to explain the file");
      console.warn("[Message Sender] File attached but no message provided.");
      return;
    }

    console.log("[Message Sender] Preparing to send message...");

    // Create temporary user message
    const tempId = `temp-${Date.now()}`;
    const tempUserMessage = {
      _id: tempId,
      conversation: conversation?._id,
      sender: "user",
      textContent: message,
      type: "text",
      timestamp: new Date(),
      isTemporary: true,
      ...(selectedFile && { file: selectedFile }),
    };

    console.log(
      "[Message Sender] Adding temporary user message:",
      tempUserMessage
    );
    setMessages((prev) => [...prev, tempUserMessage]);

    setMessage("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsBotThinking(true);

    try {
      let convId = conversation?._id;
      if (!convId) {
        console.log(
          "[Message Sender] No existing conversation. Creating a new one..."
        );
        const convResponse = await axios.post(
          `${BACKEND_URL}/api/conversations`,
          { userId: user._id, botId: selectedAIContact._id },
          { withCredentials: true }
        );
        convId = convResponse.data._id;
        setConversation(convResponse.data);
        console.log(
          "[Message Sender] New conversation created with ID:",
          convId
        );
      } else {
        console.log("[Message Sender] Using existing conversation ID:", convId);
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("conversationId", convId);
      formData.append("textContent", message);
      formData.append("tempUserMessageId", tempId);
      if (selectedFile) formData.append("file", selectedFile);

      console.log("[Message Sender] Sending message data:", {
        conversationId: convId,
        textContent: message,
        hasFile: !!selectedFile,
      });

      if (selectedAIContact.streamingEnabled) {
        console.log(
          "[Message Sender] AI supports streaming responses. Starting streaming..."
        );
        const response = await fetch(`${BACKEND_URL}/api/messages`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const reader = response.body.getReader();
        let buffer = "";
        let botMessageId = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += new TextDecoder().decode(value);
          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";

          for (const part of parts) {
            if (!part.startsWith("data: ")) continue;

            try {
              const data = JSON.parse(part.slice(6));
              console.log("[Message Sender] Streamed data received:", data);

              switch (data.type) {
                case "init":
                  console.log(
                    "[Message Sender] Bot message initialized:",
                    data.botMessage
                  );
                  setMessages((prev) => [
                    ...prev.filter((msg) => msg._id !== tempId),
                    data.userMessage,
                    { ...data.botMessage, isThinking: true },
                  ]);
                  botMessageId = data.botMessage._id;
                  break;

                case "chunk":
                  console.log(
                    "[Message Sender] Streaming bot response chunk:",
                    data.content
                  );
                  if (botMessageId) {
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg._id === botMessageId
                          ? {
                              ...msg,
                              textContent: msg.textContent + data.content,
                              isThinking: false,
                            }
                          : msg
                      )
                    );
                  }
                  break;

                case "complete":
                  console.log(
                    "[Message Sender] Bot response complete:",
                    data.botMessage
                  );
                  if (botMessageId) {
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg._id === botMessageId
                          ? {
                              ...data.botMessage,
                              isTemporary: false,
                            }
                          : msg
                      )
                    );
                  }
                  break;

                case "error":
                  console.error(
                    "[Message Sender] Error received from stream:",
                    data.message
                  );
                  setMessages((prev) =>
                    prev.filter(
                      (msg) =>
                        msg._id !== tempId &&
                        (!botMessageId || msg._id !== botMessageId)
                    )
                  );
                  alert(`Error: ${data.message}`);
                  break;
              }
            } catch (error) {
              console.error("[Message Sender] Error processing stream:", error);
            }
          }
        }
      } else {
        // Non-streaming handling
        console.log(
          "[Message Sender] AI does not support streaming. Sending standard request..."
        );
        const response = await axios.post(
          `${BACKEND_URL}/api/messages`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log(
          "[Message Sender] Non-streaming response received:",
          response.data
        );

        const { userMessage, botMessage } = response.data;
        console.log("[Message Sender] Updating messages with bot response...");

        setMessages((prev) => [
          ...prev.filter((msg) => msg._id !== tempId),
          userMessage,
          botMessage,
        ]);
      }
    } catch (error) {
      console.error("[Message Sender] Message send failed:", error);
      setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
      alert("Failed to send message. Please try again.");
    } finally {
      console.log(
        "[Message Sender] Message send process complete. Resetting bot thinking state."
      );
      setIsBotThinking(false);
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

  return (
    <main id="content" className="flex-1 overflow-hidden flex flex-col h-full">
      {/* Content */}
      <div className="relative flex-1 overflow-y-auto">
        <div className="max-w-4xl px-4 py-6 sm:px-6 lg:px-8 mx-auto">
          {/* Title */}
          <div className="text-center">
            <div className="mb-4 flex justify-center items-center">
              {/* Logo */}
              <a
                className="inline-flex items-center gap-2 rounded-md text-xl font-semibold focus:outline-hidden focus:opacity-80"
                href="#"
                aria-label="Preline"
              >
                <img
                  src={`${BACKEND_URL}/uploads/aiverse.png`}
                  alt="Aiverse Logo"
                  className="h-[30px]"
                />
                <span>AIVERSE</span>
              </a>
              {/* End Logo */}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
              Welcome to AIVERSE
            </h1>
            <p className="mt-3 text-gray-600 dark:text-neutral-400">
              Your AI-powered copilot for the web
            </p>
          </div>

          {/* End Title */}
          <ul className="mt-16 space-y-5">
            {messages.length > 0 ? (
              messages.map((msg, index) => {
                if (msg.type === "text") {
                  return (
                    <TextBubble
                      message={msg.textContent}
                      sender={msg.sender}
                      userAvatar={user.avatar}
                      botAvatar={selectedAIContact.avatar}
                    />
                  );
                } else if (msg.type === "image") {
                  return (
                    <ImageBubble
                      message={msg}
                      sender={msg.sender}
                      userAvatar={user.avatar}
                      botAvatar={selectedAIContact.avatar}
                    />
                  );
                }
              })
            ) : (
              <li className="text-center text-gray-500 dark:text-neutral-400">
                No messages yet. Start the conversation!
              </li>
            )}
            {isBotThinking && (
              <ThinkingBubble
                userAvatar={user.avatar}
                botAvatar={selectedAIContact.avatar}
                sender={"bot"}
              />
            )}
          </ul>
        </div>
        {/* Dummy element to trigger scroll */}
        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-8 dark:bg-neutral-900 dark:border-neutral-700">
        {/* Textarea */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <button
              type="button"
              className="inline-flex justify-center items-center gap-x-2 rounded-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 text-xs sm:text-sm dark:text-neutral-200 dark:hover:text-blue-500 dark:focus:text-blue-500"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              New chat
            </button>

            <button
              type="button"
              className="py-1.5 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              <svg
                className="size-3"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
              </svg>
              Stop generating
            </button>
          </div>

          {/* Input */}
          <div className="relative">
            <textarea
              className="p-3 sm:p-4 pb-12 sm:pb-12 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={3}
              placeholder={
                selectedFile ? "Add message..." : "Ask me anything..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            {/* Toolbar */}
            <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
              <div className="flex flex-wrap justify-between items-center gap-2">
                {/* Button Group */}
                <div className="flex items-center">
                  {/* Mic Button */}
                  <button
                    type="button"
                    className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <line x1="9" x2="15" y1="15" y2="9" />
                    </svg>
                  </button>
                  {/* End Mic Button */}

                  {/* Attach Button */}
                  <button
                    type="button"
                    className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  {/* End Attach Button */}
                </div>
                {/* End Button Group */}

                {/* Button Group */}
                <div className="flex items-center gap-x-1">
                  {/* Mic Button */}
                  <button
                    type="button"
                    className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  </button>
                  {/* End Mic Button */}

                  {/* Send Button */}
                  <button
                    type="button"
                    className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-hidden focus:bg-blue-500"
                    onClick={handleSendMessage}
                  >
                    <svg
                      className="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                  </button>
                  {/* End Send Button */}
                </div>
                {/* End Button Group */}
              </div>
            </div>
            {/* End Toolbar */}
          </div>
          {/* End Input */}
        </div>
        {/* End Textarea */}
      </div>
    </main>
  );
};

export default NewChatPage;
