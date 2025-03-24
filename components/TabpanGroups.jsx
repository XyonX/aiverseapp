// import React from "react";

// const TabpanGroups = () => {
//   return <div>TabpanGroups</div>;
// };

// export default TabpanGroups;

"use client";
import React, { useState } from "react";
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";

const TabpanGroups = () => {
  // const { groups } = useAppContext(); // Fetch groups from context
  const groups = [
    {
      id: "1",
      name: "Bot Dev Team",
      members: [
        { id: "u1", name: "User1", avatar: "/user1.jpg" },
        { id: "b1", name: "Bot1", avatar: "/bot1.jpg" },
        { id: "b2", name: "Bot2", avatar: "/bot2.jpg" },
        { id: "u2", name: "User2", avatar: "/user2.jpg" },
      ],
      lastMessage: "Hey, working on the AI update!",
      lastActivity: "2023-10-10T14:30:00",
      unreadCount: 2,
    },
    // More groups...
  ];
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter groups based on search query
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to group chat on click
  const handleGroupClick = (group) => {
    router.push(`/group/${group.id}`);
  };

  // Format timestamp (e.g., "14:30")
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full h-screen border-r border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Groups
        </h2>
        {/* Search Bar */}
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200 dark:placeholder-gray-400"
            placeholder="Search groups"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Group List */}
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-200 dark:divide-neutral-700">
          {filteredGroups.map((group) => (
            <li
              key={group.id}
              onClick={() => handleGroupClick(group)}
              className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <div className="flex items-center">
                {/* Group Icon (Stacked Avatars) */}
                <div className="relative flex-shrink-0">
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 3).map((member) => (
                      <img
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800"
                      />
                    ))}
                    {group.members.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-600 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                        +{group.members.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Group Details */}
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {group.name}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(group.lastActivity)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {group.lastMessage}
                    </p>
                    {group.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                        {group.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* New Group Button */}
      <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
        <button
          onClick={() => console.log("Create new group")} // Placeholder for group creation
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>New Group</span>
        </button>
      </div>
    </div>
  );
};

export default TabpanGroups;
