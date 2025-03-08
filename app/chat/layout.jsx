"use client";

import { useState } from "react";
import SidebarMenu from "../../components/SidebarMenu";
import ChatLeftSidebar from "../../components/ChatLeftSidebar";

// export const metadata = {
//   title: "Chat Application",
//   description: "Modern chat application with AI capabilities",
// };

export default function ChatLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileChatListOpen, setMobileChatListOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Mobile navigation - visible only on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
        <SidebarMenu isMobile={true} />
      </div>

      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <SidebarMenu />
      </div>

      {/* Chat sidebar - collapsible on mobile */}
      <div className="w-full md:w-auto md:flex-shrink-0 h-[calc(100vh-64px)] md:h-screen overflow-hidden">
        <ChatLeftSidebar />
      </div>

      {/* Main chat area */}
      <div className="flex-grow h-[calc(100vh-64px)] md:h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}
