"use client";
import React from "react";
import { useAppContext } from "@/app/AppProvider";

// Toggle Switch Component
const ToggleSwitch = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div
      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
        checked ? "translate-x-5" : ""
      }`}
    ></div>
  </label>
);

// Reusable Setting Item Component
const SettingItem = ({ title, control }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-gray-600 dark:text-gray-300">{title}</span>
    {control}
  </div>
);

const TabpanSettings = () => {
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    notificationsEnabled,
    setNotificationsEnabled,
    notificationSound,
    setNotificationSound,
    profileVisibility,
    setProfileVisibility,
    dataSharing,
    setDataSharing,
  } = useAppContext();

  return (
    <div className="w-full md:w-80 lg:w-96 h-screen border-r border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Settings
        </h2>
      </div>

      {/* Settings Sections */}
      <div className="flex-1 p-4 space-y-4">
        {/* Appearance */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Appearance
          </h3>
          <SettingItem
            title="Dark Mode"
            control={
              <ToggleSwitch
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              />
            }
          />
          <SettingItem
            title="Font Size"
            control={
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="mt-1 py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            }
          />
        </section>

        {/* Notifications */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Notifications
          </h3>
          <SettingItem
            title="Enable Notifications"
            control={
              <ToggleSwitch
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
            }
          />
          <SettingItem
            title="Notification Sound"
            control={
              <select
                value={notificationSound}
                onChange={(e) => setNotificationSound(e.target.value)}
                className="mt-1 py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200"
              >
                <option value="default">Default</option>
                <option value="silent">Silent</option>
                <option value="custom">Custom</option>
              </select>
            }
          />
        </section>

        {/* Bots */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Bots
          </h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Manage Bots
          </button>
        </section>

        {/* Account */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Account
          </h3>
          <ul className="space-y-2">
            <li>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Change Password
              </button>
            </li>
            <li>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Update Email
              </button>
            </li>
            <li>
              <button className="text-sm text-red-600 dark:text-red-400 hover:underline">
                Delete Account
              </button>
            </li>
          </ul>
        </section>

        {/* Privacy */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Privacy
          </h3>
          <SettingItem
            title="Profile Visibility"
            control={
              <select
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="mt-1 py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            }
          />
          <SettingItem
            title="Share Data with Bots"
            control={
              <ToggleSwitch
                checked={dataSharing}
                onChange={() => setDataSharing(!dataSharing)}
              />
            }
          />
        </section>

        {/* Help & Support */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Help & Support
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact Support
              </a>
            </li>
            <li className="text-sm text-gray-600 dark:text-gray-300">
              App Version: 1.0.0
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TabpanSettings;
