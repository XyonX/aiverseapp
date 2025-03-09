// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { useAppContext } from "@/app/AppProvider";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";

// const NewChatPage = () => {
//   const { aiContacts, selectedAIContact, setSelectedAIContact, user } =
//     useAppContext();
//   const router = useRouter();
//   const { id } = useParams();

//   const [conversation, setConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);

//   const [audioModalOpen, setAudioModalOpen] = useState(false);
//   const [videoModalOpen, setVideoModalOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(null);

//   // Fetch conversation when bot is selected
//   useEffect(() => {
//     if (!id || !user) return;

//     const bot = aiContacts.find((bot) => bot._id === id);
//     if (bot) {
//       setSelectedAIContact(bot);
//       fetchConversation(bot._id);
//     } else {
//       router.push("/chat");
//     }
//   }, [id, user, aiContacts, setSelectedAIContact, router]);

//   const fetchConversation = async (botId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/conversations/user/${user._id}/bot/${botId}`,
//         { withCredentials: true }
//       );
//       if (response.data) {
//         setConversation(response.data);
//         setMessages(response.data.messages || []);
//       } else {
//         setConversation(null);
//         setMessages([]);
//       }
//     } catch (error) {
//       console.error("Error fetching conversation:", error);
//       setMessages([]);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!selectedAIContact || !user) return;
//     if (!message.trim() && !selectedFile) return;
//     if (selectedFile && !message.trim()) {
//       alert("Please add a message to explain the file");
//       return;
//     }

//     try {
//       let convId = conversation?._id;
//       if (!convId) {
//         const convResponse = await axios.post(
//           "http://localhost:3001/api/conversations",
//           { userId: user._id, botId: selectedAIContact._id },
//           { withCredentials: true }
//         );
//         convId = convResponse.data._id;
//         setConversation(convResponse.data);
//       }

//       const formData = new FormData();
//       formData.append("conversationId", convId);
//       formData.append("sender", "user");
//       formData.append("textContent", message);
//       if (selectedFile) formData.append("file", selectedFile);

//       const messageResponse = await axios.post(
//         "http://localhost:3001/api/messages",
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       const { userMessage, botMessage } = messageResponse.data;
//       setMessages((prev) => [...prev, userMessage, botMessage]);
//       setMessage("");
//       setSelectedFile(null);
//       fileInputRef.current.value = "";
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleFileSelect = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   if (!selectedAIContact) {
//     return (
//       <div className="text-center text-gray-500 dark:text-neutral-400">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="w-full overflow-hidden transition-all duration-150 bg-white user-chat dark:bg-zinc-800">
//       <div className="lg:flex">
//         <div className="relative w-full overflow-hidden">
//           {/* Chat Header */}
//           <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
//             <div className="grid grid-cols-12 items-center">
//               <div className="col-span-8 sm:col-span-4">
//                 <div className="flex items-center">
//                   <div className="block mr-2 lg:hidden">
//                     <button className="p-2 text-gray-500 text-lg">
//                       <i className="ri-arrow-left-s-line"></i>
//                     </button>
//                   </div>
//                   <div className="mr-3">
//                     <Image
//                       src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
//                       alt={`${selectedAIContact.name} Avatar`}
//                       width={36}
//                       height={36}
//                       className="rounded-full"
//                     />
//                   </div>
//                   <div className="flex-grow overflow-hidden">
//                     <h5 className="mb-0 truncate text-lg text-gray-800 dark:text-gray-50">
//                       <a href="#">{selectedAIContact.name}</a>
//                       <i className="text-green-500 ml-1 ri-record-circle-fill text-xs"></i>
//                     </h5>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-span-4 sm:col-span-8">
//                 <ul className="flex items-center justify-end lg:gap-4">
//                   <li className="px-3">
//                     <div className="relative">
//                       <button
//                         className="text-xl text-gray-500 dark:text-gray-300"
//                         onClick={() => toggleDropdown("search")}
//                       >
//                         <i className="ri-search-line"></i>
//                       </button>
//                       {dropdownOpen === "search" && (
//                         <ul className="absolute z-50 mt-2 bg-white dark:bg-zinc-700 border rounded-lg shadow-lg w-fit border-gray-50 dark:border-gray-700">
//                           <li className="p-2">
//                             <input
//                               type="text"
//                               className="text-gray-500 border-0 rounded bg-gray-50 dark:bg-zinc-600 dark:text-gray-300 placeholder:text-sm focus:ring-0"
//                               placeholder="Search.."
//                             />
//                           </li>
//                         </ul>
//                       )}
//                     </div>
//                   </li>
//                   <li>
//                     <button
//                       className="hidden lg:block text-xl text-gray-500 dark:text-gray-300"
//                       onClick={() => setAudioModalOpen(true)}
//                     >
//                       <i className="ri-phone-line"></i>
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className="hidden lg:block text-xl text-gray-500 dark:text-gray-300"
//                       onClick={() => setVideoModalOpen(true)}
//                     >
//                       <i className="ri-vidicon-line"></i>
//                     </button>
//                   </li>
//                   <li className="px-3">
//                     <div className="relative">
//                       <button
//                         className="text-xl text-gray-500 dark:text-gray-300"
//                         onClick={() => toggleDropdown("more")}
//                       >
//                         <i className="ri-more-fill"></i>
//                       </button>
//                       {dropdownOpen === "more" && (
//                         <ul className="absolute z-50 w-40 py-2 mt-2 bg-white dark:bg-zinc-600 border rounded shadow-lg border-gray-50 dark:border-gray-600/50">
//                           <li>
//                             <a
//                               href="#"
//                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
//                             >
//                               Archive{" "}
//                               <i className="float-right ri-archive-line"></i>
//                             </a>
//                           </li>
//                           <li>
//                             <a
//                               href="#"
//                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
//                             >
//                               Muted{" "}
//                               <i className="float-right ri-volume-mute-line"></i>
//                             </a>
//                           </li>
//                           <li>
//                             <a
//                               href="#"
//                               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
//                             >
//                               Delete{" "}
//                               <i className="float-right ri-delete-bin-line"></i>
//                             </a>
//                           </li>
//                         </ul>
//                       )}
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           {/* Conversation Area */}
//           <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
//             <ul className="mt-4 space-y-5">
//               {messages.length > 0 ? (
//                 messages.map((msg, index) =>
//                   msg.sender === "user" ? (
//                     <li
//                       key={index}
//                       className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4"
//                     >
//                       <div className="grow text-end space-y-3">
//                         <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
//                           <p className="text-sm text-white">
//                             {msg.textContent}
//                           </p>
//                         </div>
//                       </div>
//                       <Image
//                         src={`http://localhost:3001/uploads/${user.avatar}`}
//                         alt="User Avatar"
//                         width={38}
//                         height={38}
//                         className="shrink-0 size-9.5 rounded-full"
//                       />
//                     </li>
//                   ) : (
//                     <li key={index} className="flex gap-x-2 sm:gap-x-4">
//                       <Image
//                         src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
//                         alt="AI Avatar"
//                         width={38}
//                         height={38}
//                         className="shrink-0 size-9.5 rounded-full"
//                       />
//                       <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 dark:bg-neutral-900 dark:border-neutral-700">
//                         <p className="text-sm text-gray-800 dark:text-white">
//                           {msg.textContent}
//                         </p>
//                       </div>
//                     </li>
//                   )
//                 )
//               ) : (
//                 <li className="text-center text-gray-500 dark:text-neutral-400">
//                   No messages yet. Start the conversation!
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Input Area */}
//           <div className="max-w-6xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-neutral-900 dark:border-neutral-700">
//             {selectedFile && (
//               <div className="mb-2 p-2 bg-gray-100 dark:bg-neutral-700 rounded">
//                 <span className="text-sm text-gray-600 dark:text-neutral-300">
//                   {selectedFile.name}
//                 </span>
//                 <button
//                   className="text-red-500 text-sm ml-2"
//                   onClick={() => {
//                     setSelectedFile(null);
//                     fileInputRef.current.value = "";
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//             <div className="relative">
//               <textarea
//                 className="p-3 sm:p-4 pb-12 sm:pb-12 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
//                 placeholder={
//                   selectedFile ? "Add message..." : "Ask me anything..."
//                 }
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
//                 <div className="flex flex-wrap justify-between items-center gap-2">
//                   <div className="flex items-center">
//                     <button
//                       type="button"
//                       className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700"
//                       onClick={() => fileInputRef.current.click()}
//                     >
//                       <svg
//                         className="shrink-0 size-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                   <button
//                     type="button"
//                     className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500"
//                     onClick={handleSendMessage}
//                   >
//                     <svg
//                       className="shrink-0 size-3.5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 16 16"
//                     >
//                       <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               onChange={handleFileSelect}
//               accept="image/*, .pdf, .docx"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewChatPage;

"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/AppProvider";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import TextBubble from "@/components/MessageBubbles/TextBubble";
import ImageBubble from "@/components/MessageBubbles/ImageBubble";

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

  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  let BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001"; // Fallback for local dev

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
        `${BACKEND_URL}/api/messages`,
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
    // <div className="w-full overflow-hidden transition-all duration-150 bg-white user-chat dark:bg-zinc-800">
    //   <div className="lg:flex">
    //     <div className="relative w-full overflow-hidden">
    //       {/* Chat Header */}
    //       <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
    //         <div className="grid grid-cols-12 items-center">
    //           <div className="col-span-8 sm:col-span-4">
    //             <div className="flex items-center">
    //               <div className="block mr-2 lg:hidden">
    //                 <button className="p-2 text-gray-500 text-lg">
    //                   <i className="ri-arrow-left-s-line"></i>
    //                 </button>
    //               </div>
    //               <div className="mr-3">
    //                 <Image
    //                   src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
    //                   alt={`${selectedAIContact.name} Avatar`}
    //                   width={36}
    //                   height={36}
    //                   className="rounded-full"
    //                 />
    //               </div>
    //               <div className="flex-grow overflow-hidden">
    //                 <h5 className="mb-0 truncate text-lg text-gray-800 dark:text-gray-50">
    //                   <a href="#">{selectedAIContact.name}</a>
    //                   <i className="text-green-500 ml-1 ri-record-circle-fill text-xs"></i>
    //                 </h5>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="col-span-4 sm:col-span-8">
    //             <ul className="flex items-center justify-end lg:gap-4">
    //               <li className="px-3">
    //                 <div className="relative">
    //                   <button
    //                     className="text-xl text-gray-500 dark:text-gray-300"
    //                     onClick={() => toggleDropdown("search")}
    //                   >
    //                     <i className="ri-search-line"></i>
    //                   </button>
    //                   {dropdownOpen === "search" && (
    //                     <ul className="absolute z-50 mt-2 bg-white dark:bg-zinc-700 border rounded-lg shadow-lg w-fit border-gray-50 dark:border-gray-700">
    //                       <li className="p-2">
    //                         <input
    //                           type="text"
    //                           className="text-gray-500 border-0 rounded bg-gray-50 dark:bg-zinc-600 dark:text-gray-300 placeholder:text-sm focus:ring-0"
    //                           placeholder="Search.."
    //                         />
    //                       </li>
    //                     </ul>
    //                   )}
    //                 </div>
    //               </li>
    //               <li>
    //                 <button
    //                   className="hidden lg:block text-xl text-gray-500 dark:text-gray-300"
    //                   onClick={() => setAudioModalOpen(true)}
    //                 >
    //                   <i className="ri-phone-line"></i>
    //                 </button>
    //               </li>
    //               <li>
    //                 <button
    //                   className="hidden lg:block text-xl text-gray-500 dark:text-gray-300"
    //                   onClick={() => setVideoModalOpen(true)}
    //                 >
    //                   <i className="ri-vidicon-line"></i>
    //                 </button>
    //               </li>
    //               <li className="px-3">
    //                 <div className="relative">
    //                   <button
    //                     className="text-xl text-gray-500 dark:text-gray-300"
    //                     onClick={() => toggleDropdown("more")}
    //                   >
    //                     <i className="ri-more-fill"></i>
    //                   </button>
    //                   {dropdownOpen === "more" && (
    //                     <ul className="absolute z-50 w-40 py-2 mt-2 bg-white dark:bg-zinc-600 border rounded shadow-lg border-gray-50 dark:border-gray-600/50">
    //                       <li>
    //                         <a
    //                           href="#"
    //                           className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
    //                         >
    //                           Archive{" "}
    //                           <i className="float-right ri-archive-line"></i>
    //                         </a>
    //                       </li>
    //                       <li>
    //                         <a
    //                           href="#"
    //                           className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
    //                         >
    //                           Muted{" "}
    //                           <i className="float-right ri-volume-mute-line"></i>
    //                         </a>
    //                       </li>
    //                       <li>
    //                         <a
    //                           href="#"
    //                           className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
    //                         >
    //                           Delete{" "}
    //                           <i className="float-right ri-delete-bin-line"></i>
    //                         </a>
    //                       </li>
    //                     </ul>
    //                   )}
    //                 </div>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //       {/* Conversation Area */}
    //       <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    //         <ul className="mt-4 space-y-5">
    //           {messages.length > 0 ? (
    //             messages.map((msg, index) =>
    //               msg.sender === "user" ? (
    //                 <li
    //                   key={index}
    //                   className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4"
    //                 >
    //                   <div className="grow text-end space-y-3">
    //                     <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
    //                       <p className="text-sm text-white">
    //                         {msg.textContent}
    //                       </p>
    //                     </div>
    //                   </div>
    //                   <Image
    //                     src={`http://localhost:3001/uploads/${user.avatar}`}
    //                     alt="User Avatar"
    //                     width={38}
    //                     height={38}
    //                     className="shrink-0 size-9.5 rounded-full"
    //                   />
    //                 </li>
    //               ) : (
    //                 <li key={index} className="flex gap-x-2 sm:gap-x-4">
    //                   <Image
    //                     src={`http://localhost:3001/uploads/${selectedAIContact.avatar}`}
    //                     alt="AI Avatar"
    //                     width={38}
    //                     height={38}
    //                     className="shrink-0 size-9.5 rounded-full"
    //                   />
    //                   <div className="inline-block bg-white border border-gray-200 rounded-lg p-4 dark:bg-neutral-900 dark:border-neutral-700">
    //                     <p className="text-sm text-gray-800 dark:text-white">
    //                       {msg.textContent}
    //                     </p>
    //                   </div>
    //                 </li>
    //               )
    //             )
    //           ) : (
    //             <li className="text-center text-gray-500 dark:text-neutral-400">
    //               No messages yet. Start the conversation!
    //             </li>
    //           )}
    //         </ul>
    //       </div>

    //       {/* Input Area */}
    //       <div className="max-w-6xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-neutral-900 dark:border-neutral-700">
    //         {selectedFile && (
    //           <div className="mb-2 p-2 bg-gray-100 dark:bg-neutral-700 rounded">
    //             <span className="text-sm text-gray-600 dark:text-neutral-300">
    //               {selectedFile.name}
    //             </span>
    //             <button
    //               className="text-red-500 text-sm ml-2"
    //               onClick={() => {
    //                 setSelectedFile(null);
    //                 fileInputRef.current.value = "";
    //               }}
    //             >
    //               ×
    //             </button>
    //           </div>
    //         )}
    //         <div className="relative">
    //           <textarea
    //             className="p-3 sm:p-4 pb-12 sm:pb-12 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
    //             placeholder={
    //               selectedFile ? "Add message..." : "Ask me anything..."
    //             }
    //             value={message}
    //             onChange={(e) => setMessage(e.target.value)}
    //           />
    //           <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
    //             <div className="flex flex-wrap justify-between items-center gap-2">
    //               <div className="flex items-center">
    //                 <button
    //                   type="button"
    //                   className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700"
    //                   onClick={() => fileInputRef.current.click()}
    //                 >
    //                   <svg
    //                     className="shrink-0 size-4"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
    //                     />
    //                   </svg>
    //                 </button>
    //               </div>
    //               <button
    //                 type="button"
    //                 className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500"
    //                 onClick={handleSendMessage}
    //               >
    //                 <svg
    //                   className="shrink-0 size-3.5"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="currentColor"
    //                   viewBox="0 0 16 16"
    //                 >
    //                   <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
    //                 </svg>
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //         <input
    //           type="file"
    //           ref={fileInputRef}
    //           className="hidden"
    //           onChange={handleFileSelect}
    //           accept="image/*, .pdf, .docx"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
                  src="aiverse.png"
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
          </ul>
        </div>
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
