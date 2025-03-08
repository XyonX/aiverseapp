// "use client";
// import { useAppContext } from "@/app/AppProvider";
// import React from "react";
// import TabpanProfile from "./TabpanProfile";
// import TabPanchats from "./TabpanChats";
// import TabpanGroups from "./TabpanGroups";
// import TabpanContacts from "./TabpanContacts";
// import TabpanSettings from "./TabpanSettings";

// const ChatLeftSidebar = () => {
//   const { selectedTab } = useAppContext();
//   return (
//     <div class="chat-leftsidebar lg:w-[380px] group-data-[theme-color=violet]:bg-slate-50 group-data-[theme-color=green]:bg-green-50/20 group-data-[theme-color=red]:bg-red-50/20 shadow overflow-y-hidden mb-[80px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700">
//       <div>
//         <div class="tab-content active">
//           {selectedTab === "chats" && <TabPanchats />}
//           {selectedTab === "profile" && <TabpanProfile />}
//           {selectedTab === "groups" && <TabpanGroups />}
//           {selectedTab === "contacts" && <TabpanContacts />}
//           {selectedTab === "settings" && <TabpanSettings />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatLeftSidebar;

"use client";

import { useAppContext } from "@/app/AppProvider";
import React from "react";
import TabpanProfile from "./TabpanProfile";
import TabPanchats from "./TabpanChats";
import TabPanchats2 from "./TabpanChats2";
import TabpanGroups from "./TabpanGroups";
import TabpanContacts from "./TabpanContacts";
import TabpanSettings from "./TabpanSettings";

const ChatLeftSidebar = () => {
  const { selectedTab } = useAppContext();
  return (
    <div className="chat-leftsidebar lg:w-[380px] bg-gray-50 dark:bg-neutral-800 shadow overflow-y-hidden mb-[80px] lg:mb-0">
      <div>
        <div className="tab-content active">
          {selectedTab === "chats" && <TabPanchats2 />}

          {selectedTab === "profile" && <TabpanProfile />}
          {selectedTab === "groups" && <TabpanGroups />}
          {selectedTab === "contacts" && <TabpanContacts />}
          {selectedTab === "settings" && <TabpanSettings />}
        </div>
      </div>
    </div>
  );
};

export default ChatLeftSidebar;
