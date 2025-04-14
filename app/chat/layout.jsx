"use client";
// // export default function ChatLayout({ children }) {
// //   // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   // const [mobileChatListOpen, setMobileChatListOpen] = useState(false);

// //   const { selectedAIContact, setSelectedAIContact } = useAppContext();
// //   const isMobile = useMediaQuery("(max-width: 768px)");

// //   return (
// //     <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
// //       {/* Mobile navigation - visible only on small screens */}
// //       <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
// //         <SidebarMenu isMobile={true} />
// //       </div>

// //       {/* Desktop sidebar - hidden on mobile */}
// //       <div className="hidden md:block">
// //         <SidebarMenu />
// //       </div>

// //       {/* Chat sidebar - collapsible on mobile */}
// //       <div className="w-full md:w-auto md:flex-shrink-0 h-[calc(100vh-64px)] md:h-screen overflow-hidden">
// //         <ChatLeftSidebar />
// //       </div>

// //       {/* Main chat area */}
// //       <div className="flex-grow h-[calc(100vh-64px)] md:h-screen overflow-hidden">
// //         {children}
// //       </div>
// //     </div>
// //   );
// // }

// // export default function ChatLayout({ children }) {
// //   const { selectedAIContact, setSelectedAIContact } = useAppContext();
// //   const isMobile = useMediaQuery("(max-width: 768px)");

// //   return (
// //     <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
// //       {/* Mobile Bottom Menu - Only shows when no chat selected */}
// //       {isMobile && !selectedAIContact && (
// //         <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
// //           <SidebarMenu isMobile={true} />
// //         </div>
// //       )}

// //       {/* Desktop Sidebar */}
// //       {!isMobile && (
// //         <div className="hidden md:block">
// //           <SidebarMenu />
// //         </div>
// //       )}

// //       {/* Chat List Sidebar - Always visible except when chat is open on mobile */}
// //       {(isMobile && !selectedAIContact) || !isMobile ? (
// //         <div
// //           className={`w-full md:w-auto md:flex-shrink-0 ${
// //             isMobile ? "h-[calc(100vh-64px)]" : "h-screen"
// //           } overflow-hidden`}
// //         >
// //           <ChatLeftSidebar />
// //         </div>
// //       ) : null}

// //       {/* Main Chat Area - Conditionally rendered */}
// //       {(!isMobile || selectedAIContact) && (
// //         <div
// //           className={`flex-grow ${
// //             isMobile ? "h-screen" : "h-screen"
// //           } overflow-hidden relative bg-white dark:bg-neutral-900`}
// //         >
// //           {/* Mobile Back Button */}
// //           {isMobile && selectedAIContact && (
// //             <button
// //               onClick={() => setSelectedAIContact(null)}
// //               className="absolute top-2 left-2 p-2 z-50 md:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full"
// //             >
// //               ← Back
// //             </button>
// //           )}

// //           {/* Chat Content - Only rendered when contact is selected or on desktop */}
// //           <div
// //             className={`h-full ${isMobile && selectedAIContact ? "pt-10" : ""}`}
// //           >
// //             {children}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, React } from "react";
// import SidebarMenu from "../../components/SidebarMenu";
// import ChatLeftSidebar from "../../components/ChatLeftSidebar";
// import { useAppContext } from "@/app/AppProvider";
// import { useMediaQuery } from "@/utils/useMediaQuery";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/AppSidebar";
// import { BotProvider, useBot } from "@/context/BotContext";

// export default function ChatLayout({ children }) {
//   const { selectedBot } = useBot();
//   const { selectedAIContact, setSelectedAIContact } = useAppContext();
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   return (
//     <BotProvider>
//       <SidebarProvider
//         style={{
//           "--sidebar-width": "350px",
//         }}
//       >
//         <AppSidebar />
//         <SidebarInset>
//           {selectedBot ? (
//             <ConversationView bot={selectedBot} />
//           ) : (
//             <div className="flex h-full items-center justify-center bg-muted/20">
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold mb-2">
//                   Select a chat to start messaging
//                 </h2>
//                 <p className="text-muted-foreground">
//                   Choose a bot from the sidebar to begin a conversation
//                 </p>
//               </div>
//             </div>
//           )}
//         </SidebarInset>
//       </SidebarProvider>
//     </BotProvider>
//   );
// }

// function ChatPage() {
//   const { selectedBot } = useBot();

//   return (
//     <SidebarProvider
//       style={{
//         "--sidebar-width": "350px",
//       }}
//     >
//       <AppSidebar />
//       <SidebarInset>
//         {selectedBot ? (
//           <ConversationView bot={selectedBot} />
//         ) : (
//           <div className=" hidden md:flex h-full items-center justify-center bg-muted/20">
//             <div className="text-center">
//               <h2 className="text-2xl font-bold mb-2">
//                 Select a chat to start messaging
//               </h2>
//               <p className="text-muted-foreground">
//                 Choose a bot from the sidebar to begin a conversation
//               </p>
//             </div>
//           </div>
//         )}
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }

// export default function ChatLayout({ children }) {
//   if (!children)
//     return (
//       <>
//         <AppSidebar />
//         <SidebarInset>
//           <div className=" hidden md:flex h-full items-center justify-center bg-muted/20">
//             <div className="text-center">
//               <h2 className="text-2xl font-bold mb-2">
//                 Select a chat to start messaging
//               </h2>
//               <p className="text-muted-foreground">
//                 Choose a bot from the sidebar to begin a conversation eststfggt
//               </p>
//             </div>
//           </div>
//         </SidebarInset>
//       </>
//     );
//   else
//     return (
//       <>
//         <AppSidebar />
//         <div className="w-full">{children}</div>
//       </>
//     );
// }

// export default function ChatLayout({ children }) {
//   return <DiscordLayout />;
// }

{
  /* <SidebarProvider
style={{
  "--sidebar-width": "450px",
}}
>
{children}
</SidebarProvider> */
}

// export default function ChatLayout({ children }) {
//   // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   // const [mobileChatListOpen, setMobileChatListOpen] = useState(false);

//   const { selectedAIContact, setSelectedAIContact } = useAppContext();
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
//       {/* Mobile navigation - visible only on small screens */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
//         <SidebarMenu isMobile={true} />
//       </div>

//       {/* Desktop sidebar - hidden on mobile */}
//       <div className="hidden md:block">
//         <SidebarMenu />
//       </div>

//       {/* Chat sidebar - collapsible on mobile */}
//       <div className="w-full md:w-auto md:flex-shrink-0 h-[calc(100vh-64px)] md:h-screen overflow-hidden">
//         <ChatLeftSidebar />
//       </div>

//       {/* Main chat area */}
//       <div className="flex-grow h-[calc(100vh-64px)] md:h-screen overflow-hidden">
//         {children}
//       </div>
//     </div>
//   );
// }

// export default function ChatLayout({ children }) {
//   const { selectedAIContact, setSelectedAIContact } = useAppContext();
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
//       {/* Mobile Bottom Menu - Only shows when no chat selected */}
//       {isMobile && !selectedAIContact && (
//         <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
//           <SidebarMenu isMobile={true} />
//         </div>
//       )}

//       {/* Desktop Sidebar */}
//       {!isMobile && (
//         <div className="hidden md:block">
//           <SidebarMenu />
//         </div>
//       )}

//       {/* Chat List Sidebar - Always visible except when chat is open on mobile */}
//       {(isMobile && !selectedAIContact) || !isMobile ? (
//         <div
//           className={`w-full md:w-auto md:flex-shrink-0 ${
//             isMobile ? "h-[calc(100vh-64px)]" : "h-screen"
//           } overflow-hidden`}
//         >
//           <ChatLeftSidebar />
//         </div>
//       ) : null}

//       {/* Main Chat Area - Conditionally rendered */}
//       {(!isMobile || selectedAIContact) && (
//         <div
//           className={`flex-grow ${
//             isMobile ? "h-screen" : "h-screen"
//           } overflow-hidden relative bg-white dark:bg-neutral-900`}
//         >
//           {/* Mobile Back Button */}
//           {isMobile && selectedAIContact && (
//             <button
//               onClick={() => setSelectedAIContact(null)}
//               className="absolute top-2 left-2 p-2 z-50 md:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full"
//             >
//               ← Back
//             </button>
//           )}

//           {/* Chat Content - Only rendered when contact is selected or on desktop */}
//           <div
//             className={`h-full ${isMobile && selectedAIContact ? "pt-10" : ""}`}
//           >
//             {children}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// app/chat/layout.jsx
// app/chat/layout.jsx
// import { usePathname } from 'next/navigation';

// app/chat/layout.jsx

import React from "react";
import { AppSidebar } from "../../components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ConversationView } from "@/components/ConversationView";
import { BotProvider, useBot } from "@/context/BotContext";
import DiscordLayout from "@/components/DiscordLayout";
import NavigationPane from "@/components/final/NavigationPane";
import DetailView from "@/components/final/DetailView";
import { useAppContext } from "@/app/AppProvider";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import DiscoverView from "@/components/DiscoverView";

export default function ChatLayout({ children }) {
  const { selectedAIContact, setSelectedAIContact, activeTab } =
    useAppContext();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  // Reset selected contact when navigating away from chat
  useEffect(() => {
    if (!pathname.includes("/chat/")) {
      setSelectedAIContact(null);
    }
  }, [pathname, setSelectedAIContact]);

  return (
    <SidebarProvider>
      <main className="flex flex-row h-screen w-screen">
        {/* Navigation Pane - Full height + fixed width */}
        <NavigationPane className="h-full w-[45px] md:w-[60px]" />
        {/* Detail View */}
        <div
          className={`h-full ${
            isMobile || activeTab === "discover"
              ? "flex-1 min-w-0"
              : "w-[400px] flex-shrink-0 border-r border-border"
          }`}
        >
          <DetailView />
        </div>
        {/* Conversation Area */}
        {!isMobile && activeTab !== "discover" && (
          <div className="flex-1 h-full overflow-hidden bg-background">
            {children}
          </div>
        )}
      </main>
    </SidebarProvider>
  );
}
