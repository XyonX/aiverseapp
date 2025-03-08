"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/AppProvider";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

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
        `http://localhost:3001/api/conversations/user/${user._id}/bot/${botId}`,
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
      let convId = conversation?._id;
      if (!convId) {
        const convResponse = await axios.post(
          "http://localhost:3001/api/conversations",
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

  return (
    <div className="relative h-screen dark:bg-neutral-900">
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
                alt={`${selectedAIContact.name} Avatar`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                {selectedAIContact.name}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-500 dark:text-neutral-400">
                <svg
                  className="size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="text-gray-500 dark:text-neutral-400">
                <svg
                  className="size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v14m7-7H5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Conversation Area */}
        <ul className="mt-4 space-y-5">
          {messages.length > 0 ? (
            messages.map((msg, index) =>
              msg.sender === "user" ? (
                <li
                  key={index}
                  className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4"
                >
                  <div className="grow text-end space-y-3">
                    <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                      <p className="text-sm text-white">{msg.textContent}</p>
                    </div>
                  </div>
                  <Image
                    src={`http://localhost:3001/uploads/${user.avatar}`}
                    alt="User Avatar"
                    width={38}
                    height={38}
                    className="shrink-0 size-9.5 rounded-full"
                  />
                </li>
              ) : (
                <li key={index} className="flex gap-x-2 sm:gap-x-4">
                  <Image
                    src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
                    alt="AI Avatar"
                    width={38}
                    height={38}
                    className="shrink-0 size-9.5 rounded-full"
                  />
                  <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="text-sm text-gray-800 dark:text-white">
                      {msg.textContent}
                    </p>
                  </div>
                </li>
              )
            )
          ) : (
            <li className="text-center text-gray-500 dark:text-neutral-400">
              No messages yet. Start the conversation!
            </li>
          )}
        </ul>
      </div>

      {/* Input Area */}
      <div className="max-w-4xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-neutral-900 dark:border-neutral-700">
        {selectedFile && (
          <div className="mb-2 p-2 bg-gray-100 dark:bg-neutral-700 rounded">
            <span className="text-sm text-gray-600 dark:text-neutral-300">
              {selectedFile.name}
            </span>
            <button
              className="text-red-500 text-sm ml-2"
              onClick={() => {
                setSelectedFile(null);
                fileInputRef.current.value = "";
              }}
            >
              ×
            </button>
          </div>
        )}
        <div className="relative">
          <textarea
            className="p-3 sm:p-4 pb-12 sm:pb-12 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
            placeholder={selectedFile ? "Add message..." : "Ask me anything..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center">
                <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700"
                  onClick={() => fileInputRef.current.click()}
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500"
                onClick={handleSendMessage}
              >
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*, .pdf, .docx"
        />
      </div>
    </div>
  );
};

export default NewChatPage;
