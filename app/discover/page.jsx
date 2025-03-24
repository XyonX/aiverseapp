"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";

const DiscoverPage = () => {
  const { user, aiContacts } = useAppContext();
  const router = useRouter();
  const [bots, setBots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch("/api/bots");
        if (response.ok) {
          const data = await response.json();
          setBots(data);
        } else {
          console.error("Failed to fetch bots");
        }
      } catch (error) {
        console.error("Error fetching bots:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBots();
  }, []);

  const filteredBots = bots.filter(
    (bot) =>
      bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bot.description &&
        bot.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = ["general", "role-playing", "specialized", "ai-agents"];
  const groupedBots = categories.reduce((acc, category) => {
    acc[category] = filteredBots.filter((bot) => bot.category === category);
    return acc;
  }, {});

  const handleAddBot = async (botId) => {
    try {
      const response = await fetch("/api/user/bots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botId }),
      });
      if (response.ok) {
        console.log(`Bot ${botId} added successfully`);
      } else {
        console.error("Failed to add bot");
      }
    } catch (error) {
      console.error("Error adding bot:", error);
    }
  };

  const handleBookmarkBot = (botId) => {
    console.log(`Bookmarked bot ${botId}`);
  };

  const handleChat = (botId) => {
    router.push(`/chat/${botId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-800">
      {/* Header Section */}
      <header className="bg-white dark:bg-neutral-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Discover Bots
          </h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search bots by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-xl py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Loading bots...</p>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => {
              const categoryBots = groupedBots[category];
              if (categoryBots.length === 0) return null;
              return (
                <section key={category}>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                    {category === "ai-agents"
                      ? "AI Agents"
                      : `${
                          category.charAt(0).toUpperCase() + category.slice(1)
                        } Bots`}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryBots.map((bot) => {
                      const isAdded = user.bots.some((b) => b.$oid === bot._id);
                      return (
                        <div
                          key={bot._id}
                          className="bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-md transition-shadow p-4"
                        >
                          <div className="flex items-center">
                            <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${bot.avatar}`}
                              alt={bot.name}
                              className="w-16 h-16 rounded-full object-cover"
                              onError={(e) =>
                                (e.target.src = "/default-bot.png")
                              }
                            />
                            <div className="ml-4 flex-1">
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {bot.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {bot.description || "No description available."}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              onClick={() => handleChat(bot._id)}
                              className="py-1 px-3 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                            >
                              Chat
                            </button>
                            <button
                              onClick={() => handleAddBot(bot._id)}
                              disabled={isAdded}
                              className={`py-1 px-3 rounded-lg text-sm ${
                                isAdded
                                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                              }`}
                            >
                              {isAdded ? "Added" : "Add"}
                            </button>
                            <button
                              onClick={() => handleBookmarkBot(bot._id)}
                              className="py-1 px-3 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
                            >
                              Bookmark
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
            {filteredBots.length === 0 && (
              <p className="text-gray-600 dark:text-gray-300">
                No bots found matching your search.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default DiscoverPage;
