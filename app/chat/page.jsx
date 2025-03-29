import NewUserChat from "@/components/NewUserChat";
import { SidebarInset } from "@/components/ui/sidebar";

const page = () => {
  // return (
  //   <div className=" hidden md:block">
  //     <NewUserChat />
  //   </div>
  // );
  return (
    <SidebarInset>
      <div className=" hidden md:flex h-full items-center justify-center bg-muted/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            Select a chat to start messaging
          </h2>
          <p className="text-muted-foreground">
            Choose a bot from the sidebar to begin a conversation
          </p>
        </div>
      </div>
    </SidebarInset>
  );
};

export default page;
