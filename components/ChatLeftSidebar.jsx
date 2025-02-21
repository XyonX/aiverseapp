import React from "react";
import TabpanProfile from "./TabpanProfile";
import TabPanchats from "./TabpanChats";
import TabpanGroups from "./TabpanGroups";
import TabpanContacts from "./TabpanContacts";
import TabpanSettings from "./TabpanSettings";

const ChatLeftSidebar = () => {
  return (
    <div class="chat-leftsidebar lg:w-[380px] group-data-[theme-color=violet]:bg-slate-50 group-data-[theme-color=green]:bg-green-50/20 group-data-[theme-color=red]:bg-red-50/20 shadow overflow-y-hidden mb-[80px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700">
      <div>
        <div class="tab-content">
          <TabpanProfile />
        </div>
        <div class="tab-content active">
          <TabPanchats />
        </div>
        <div class="tab-content ">
          <TabpanGroups />
        </div>
        <div class="tab-content ">
          <TabpanContacts />
        </div>
        <div class="tab-content ">
          <TabpanSettings />
        </div>
      </div>
    </div>
  );
};

export default ChatLeftSidebar;
