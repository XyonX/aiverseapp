//import SidebarMenu from "@/components/SidebarMenu";
//import ChatLeftSidebar from "@/components/ChatLeftSidebar";
import SidebarMenu from "../../components/SidebarMenu";
import ChatLeftSidebar from "../../components/ChatLeftSidebar";

export default function ChatLayout({ children }) {
  return (
    <div className="flex">
      <SidebarMenu />
      <ChatLeftSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
