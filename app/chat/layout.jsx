"use client";

import { useState } from "react";
import SidebarMenu from "../../components/SidebarMenu";
import ChatLeftSidebar from "../../components/ChatLeftSidebar";
import { useAppContext } from "@/app/AppProvider";
import { useMediaQuery } from "@/utils/useMediaQuery";

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

export default function ChatLayout({ children }) {
  const { selectedAIContact, setSelectedAIContact } = useAppContext();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Mobile Bottom Menu - Only shows when no chat selected */}
      {isMobile && !selectedAIContact && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
          <SidebarMenu isMobile={true} />
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:block">
          <SidebarMenu />
        </div>
      )}

      {/* Chat List Sidebar - Always visible except when chat is open on mobile */}
      {(isMobile && !selectedAIContact) || !isMobile ? (
        <div
          className={`w-full md:w-auto md:flex-shrink-0 ${
            isMobile ? "h-[calc(100vh-64px)]" : "h-screen"
          } overflow-hidden`}
        >
          <ChatLeftSidebar />
        </div>
      ) : null}

      {/* Main Chat Area - Conditionally rendered */}
      {(!isMobile || selectedAIContact) && (
        <div
          className={`flex-grow ${
            isMobile ? "h-screen" : "h-screen"
          } overflow-hidden relative bg-white dark:bg-neutral-900`}
        >
          {/* Mobile Back Button */}
          {isMobile && selectedAIContact && (
            <button
              onClick={() => setSelectedAIContact(null)}
              className="absolute top-2 left-2 p-2 z-50 md:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full"
            >
              ← Back
            </button>
          )}

          {/* Chat Content - Only rendered when contact is selected or on desktop */}
          <div
            className={`h-full ${isMobile && selectedAIContact ? "pt-10" : ""}`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
