"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/AppProvider";
import { auth } from "@/app/firebase/config";

export function ProfileView() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  const { user } = useAppContext();
  console.log("user received", user);

  // Local state for editable fields
  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description || "");
  const [preferences, setPreferences] = useState(user.preferences || []);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${user.avatar}`
  );
  const fileInputRef = useRef(null);

  // Predefined list of available preferences (can be fetched from backend later)
  const availablePreferences = [
    "Artificial Intelligence",
    "Blockchain",
    "Cybersecurity",
    "Game Development",
    "Metaverse",
    "Quantum Computing",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
  ];

  // Sync state with user data if it changes
  useEffect(() => {
    setUsername(user.username);
    setDescription(user.about || "");
    setPreferences(user.preferences || []);
    setAvatarPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.avatar}`);
  }, [user]);

  // Handle avatar file selection and preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Handle save action (to be connected to backend later)
  const handleSave = async () => {
    try {
      // Get current Firebase user directly
      const firebaseUser = auth.currentUser;

      if (!firebaseUser) {
        console.error("No authenticated user");
        return;
      }

      // Get fresh ID token
      const idToken = await firebaseUser.getIdToken();
      console.log(`Updating profile for UID: ${firebaseUser.uid}`);

      const formData = new FormData();
      formData.append("username", username);
      formData.append("description", description);
      formData.append("preferences", JSON.stringify(preferences));
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await fetch(`${BACKEND_URL}/api/auth/updateprofile`, {
        method: "PATCH",
        headers: {
          // Include Authorization header with Firebase ID token
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        // Optional: Refresh auth state if needed
        await firebaseUser.getIdToken(true); // Force token refresh
      } else {
        console.error("Failed to update profile", await response.json());
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className="h-full w-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          My Profile
        </h2>
      </div>

      {/* Avatar Section */}
      <div className="p-4 flex flex-col items-center border-b border-gray-200 dark:border-neutral-700">
        <div className="relative">
          <img
            src={avatarPreview}
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition-colors"
          >
            <i className="ri-pencil-line"></i>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {user.email}
        </p>
      </div>

      {/* Profile Details */}
      <div className="flex-1 p-4 space-y-4">
        {/* Username */}
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200"
          />
        </div>

        {/* Email (Non-editable) */}
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Email
          </label>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {user.email}
          </p>
        </div>

        {/* Joined Date */}
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Joined
          </label>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            About Me (Bot Context)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200"
            rows="4"
            placeholder={description}
          />
        </div>

        {/* Preferences */}
        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Preferences
          </label>
          <div className="mt-2 space-y-2">
            {availablePreferences.map((pref) => (
              <label key={pref} className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.includes(pref)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPreferences([...preferences, pref]);
                    } else {
                      setPreferences(preferences.filter((p) => p !== pref));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {pref}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
        <button
          onClick={handleSave}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
