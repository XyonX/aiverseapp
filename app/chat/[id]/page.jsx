"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/AppProvider";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const ChatPage = () => {
  const { aiContacts, selectedAIContact, setSelectedAIContact, user } =
    useAppContext();
  console.log("Chat Page loaded");
  console.log(user);
  const router = useRouter();
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Add these to your component:
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Fetch conversation when bot is selected
  useEffect(() => {
    if (!id || !user) {
      console.log("The selected bot doest have valid id or user doesnt exist");
      return;
    }

    const bot = aiContacts.find((bot) => bot._id === id);
    if (bot) {
      setSelectedAIContact(bot);
      fetchConversation(bot._id);
    } else {
      console.log("Bot not found redirecting ot chat page");
      router.push("/chat");
    }
  }, [id, user, aiContacts, setSelectedAIContact, router]);

  console.log("Starting to fetch conversation");
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
      setConversation(null);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedAIContact || !user) {
      console.log("Message or selected contact or user not found ");
      return;
    }

    try {
      let convId = conversation?._id;
      if (!convId) {
        // Create a new conversation if it doesn’t exist
        const convResponse = await axios.post(
          "http://localhost:3001/api/conversations",
          {
            userId: user._id,
            botId: selectedAIContact._id,
          },
          { withCredentials: true }
        );
        convId = convResponse.data._id;
        setConversation(convResponse.data);
      }

      // Send the message
      const messageResponse = await axios.post(
        "http://localhost:3001/api/messages",
        {
          conversationId: convId,
          sender: "user",
          content: message,
        },
        { withCredentials: true }
      );

      const { userMessage, botMessage } = messageResponse.data; // Assuming backend returns both
      setMessages((prev) => [...prev, userMessage, botMessage]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!selectedAIContact) {
    return <div>Loading...</div>;
  }
  console.log("Selected aI CONTACT LOGGING");
  console.log(selectedAIContact);

  return (
    <div className="w-full overflow-hidden transition-all duration-150 bg-white user-chat dark:bg-zinc-800">
      <div className="lg:flex">
        <div className="relative w-full overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-8 sm:col-span-4">
                <div className="flex items-center">
                  <div className="block mr-2 lg:hidden">
                    <button className="p-2 text-gray-500 text-lg">
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                  </div>
                  <div className="mr-3">
                    <Image
                      src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
                      alt={`${selectedAIContact.name} Avatar`}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <h5 className="mb-0 truncate text-lg text-gray-800 dark:text-gray-50">
                      <a href="#">{selectedAIContact.name}</a>
                      <i className="text-green-500 ml-1 ri-record-circle-fill text-xs"></i>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-8">
                <ul className="flex items-center justify-end lg:gap-4">
                  <li className="px-3">
                    <div className="relative">
                      <button
                        className="text-xl text-gray-500 dark:text-gray-300"
                        onClick={() => toggleDropdown("search")}
                      >
                        <i className="ri-search-line"></i>
                      </button>
                      {dropdownOpen === "search" && (
                        <ul className="absolute z-50 mt-2 bg-white dark:bg-zinc-700 border rounded-lg shadow-lg w-fit border-gray-50 dark:border-gray-700">
                          <li className="p-2">
                            <input
                              type="text"
                              className="text-gray-500 border-0 rounded bg-gray-50 dark:bg-zinc-600 dark:text-gray-300 placeholder:text-sm focus:ring-0"
                              placeholder="Search.."
                            />
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                  <li>
                    <button
                      className="hidden lg:block text-xl text-gray-500 dark:text-gray-300"
                      onClick={() => setAudioModalOpen(true)}
                    >
                      <i className="ri-phone-line"></i>
                    </button>
                  </li>
                  <li>
                    <button
                      className="hidden lg:block text-xl text-gray-500 dark:text-gray-300"
                      onClick={() => setVideoModalOpen(true)}
                    >
                      <i className="ri-vidicon-line"></i>
                    </button>
                  </li>
                  <li className="px-3">
                    <div className="relative">
                      <button
                        className="text-xl text-gray-500 dark:text-gray-300"
                        onClick={() => toggleDropdown("more")}
                      >
                        <i className="ri-more-fill"></i>
                      </button>
                      {dropdownOpen === "more" && (
                        <ul className="absolute z-50 w-40 py-2 mt-2 bg-white dark:bg-zinc-600 border rounded shadow-lg border-gray-50 dark:border-gray-600/50">
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
                            >
                              Archive{" "}
                              <i className="float-right ri-archive-line"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
                            >
                              Muted{" "}
                              <i className="float-right ri-volume-mute-line"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
                            >
                              Delete{" "}
                              <i className="float-right ri-delete-bin-line"></i>
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chat Conversation */}
          <div className="h-[80vh] p-4 lg:p-6 overflow-y-auto">
            <ul>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <li key={index} className="py-4">
                    <div
                      className={`flex gap-3 items-end ${
                        msg.sender === "user" ? "justify-end" : ""
                      }`}
                    >
                      {msg.sender !== "user" && (
                        <Image
                          src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
                          alt=""
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                      )}
                      <div
                        className={msg.sender === "user" ? "text-right" : ""}
                      >
                        <div className="flex gap-2 mb-2">
                          <div
                            className={`relative px-5 py-3 rounded-lg ${
                              msg.sender === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-green-500 text-white"
                            }`}
                          >
                            <p>{msg.content}</p>
                            <p className="mt-1 text-xs text-right text-white/50">
                              <i className="ri-time-line"></i>{" "}
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                          {msg.sender === "user"
                            ? "You"
                            : selectedAIContact.name}
                        </div>
                      </div>
                      {msg.sender === "user" && (
                        <Image
                          src={`http://localhost:3001/uploads/${user.avatar}`}
                          alt=""
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-4 text-center text-gray-500 dark:text-gray-300">
                  No chat history yet. Start a conversation!
                </li>
              )}
            </ul>
          </div>

          {/* Chat Input */}
          <div className="p-6 bg-white border-t border-gray-50 dark:bg-zinc-800 dark:border-zinc-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-full border-0 rounded bg-gray-50 dark:bg-zinc-700 dark:text-gray-300 placeholder:text-sm text-sm"
                placeholder="Enter Message..."
              />
              {/* Add hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*, .pdf, .docx" // Add allowed file types
              />
              <ul className="flex gap-2">
                <li>
                  <button className="text-green-500 text-lg">
                    <i className="ri-emotion-happy-line"></i>
                  </button>
                </li>
                <li>
                  <button
                    className="text-green-500 text-lg"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <i className="ri-attachment-line"></i>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleSendMessage}
                    className="text-white bg-green-500 rounded px-2 py-1"
                  >
                    <i className="ri-send-plane-2-fill"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Audio Modal */}
          {audioModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-zinc-700 rounded-lg shadow-xl max-w-lg w-full p-6">
                <div className="text-center">
                  <Image
                    src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
                    alt=""
                    width={96}
                    height={96}
                    className="rounded-full mx-auto mb-6"
                  />
                  <h5 className="text-gray-800 dark:text-gray-50">
                    {selectedAIContact.name}
                  </h5>
                  <p className="text-gray-500 dark:text-gray-300">
                    Start Audio Call
                  </p>
                  <ul className="flex justify-center mt-10 gap-4">
                    <li>
                      <button
                        className="w-12 h-12 bg-red-500 text-white rounded-full"
                        onClick={() => setAudioModalOpen(false)}
                      >
                        <i className="ri-close-fill text-xl"></i>
                      </button>
                    </li>
                    <li>
                      <button className="w-12 h-12 bg-green-500 text-white rounded-full">
                        <i className="ri-phone-fill text-xl"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Video Modal */}
          {videoModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-zinc-700 rounded-lg shadow-xl max-w-lg w-full p-6">
                <div className="text-center">
                  <Image
                    src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
                    alt=""
                    width={96}
                    height={96}
                    className="rounded-full mx-auto mb-6"
                  />
                  <h5 className="text-gray-800 dark:text-gray-50">
                    {selectedAIContact.name}
                  </h5>
                  <p className="text-gray-500 dark:text-gray-300">
                    Start Video Call
                  </p>
                  <ul className="flex justify-center mt-10 gap-4">
                    <li>
                      <button
                        className="w-12 h-12 bg-red-500 text-white rounded-full"
                        onClick={() => setVideoModalOpen(false)}
                      >
                        <i className="ri-close-fill text-xl"></i>
                      </button>
                    </li>
                    <li>
                      <button className="w-12 h-12 bg-green-500 text-white rounded-full">
                        <i className="ri-vidicon-fill text-xl"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
