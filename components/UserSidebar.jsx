import React from "react";
import TabpanProfile from "./TabpanProfile";

const UserSidebar = () => {
  return (
    <div class="chat-leftsidebar lg:w-[380px] group-data-[theme-color=violet]:bg-slate-50 group-data-[theme-color=green]:bg-green-50/20 group-data-[theme-color=red]:bg-red-50/20 shadow overflow-y-hidden mb-[80px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700">
      <div>
        {/* <!-- Start Profile tab-pane --> */}
        <div class="tab-content">
          <TabpanProfile />
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
