"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";

const UserChat = () => {
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };
  return (
    <div class="w-full overflow-hidden transition-all duration-150 bg-white user-chat dark:bg-zinc-800">
      <div class="lg:flex">
        <div className="relative w-full overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-8 sm:col-span-4">
                <div className="flex items-center">
                  <div className="block mr-2 lg:hidden">
                    <button className="p-2 text-gray-500 text-lg">
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                  </div>
                  <div className="mr-3">
                    <Image
                      src="/assets/images/users/avatar-4.jpg"
                      alt="User Avatar"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <h5 className="mb-0 truncate text-lg text-gray-800 dark:text-gray-50">
                      <a href="#">Doris Brown</a>
                      <i className="text-green-500 ml-1 ri-record-circle-fill text-xs"></i>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-8">
                <ul className="flex items-center justify-end lg:gap-4">
                  <li className="px-3">
                    <div className="relative">
                      <button
                        className="text-xl text-gray-500 dark:text-gray-300"
                        onClick={() => toggleDropdown("search")}
                      >
                        <i className="ri-search-line"></i>
                      </button>
                      {dropdownOpen === "search" && (
                        <ul className="absolute z-50 mt-2 bg-white dark:bg-zinc-700 border rounded-lg shadow-lg w-fit border-gray-50 dark:border-gray-700">
                          <li className="p-2">
                            <input
                              type="text"
                              className="text-gray-500 border-0 rounded bg-gray-50 dark:bg-zinc-600 dark:text-gray-300 placeholder:text-sm focus:ring-0"
                              placeholder="Search.."
                            />
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                  <li>
                    <button
                      className="hidden lg:block text-xl text-gray-500 dark:text-gray-300"
                      onClick={() => setAudioModalOpen(true)}
                    >
                      <i className="ri-phone-line"></i>
                    </button>
                  </li>
                  <li>
                    <button
                      className="hidden lg:block text-xl text-gray-500 dark:text-gray-300"
                      onClick={() => setVideoModalOpen(true)}
                    >
                      <i className="ri-vidicon-line"></i>
                    </button>
                  </li>
                  <li className="px-3">
                    <a
                      href="#"
                      className="hidden lg:block text-gray-500 dark:text-gray-300"
                    >
                      <i className="text-xl ri-group-line"></i>
                    </a>
                  </li>
                  <li className="px-3">
                    <div className="relative">
                      <button
                        className="text-xl text-gray-500 dark:text-gray-300"
                        onClick={() => toggleDropdown("more")}
                      >
                        <i className="ri-more-fill"></i>
                      </button>
                      {dropdownOpen === "more" && (
                        <ul className="absolute z-50 w-40 py-2 mt-2 bg-white dark:bg-zinc-600 border rounded shadow-lg border-gray-50 dark:border-gray-600/50">
                          <li className="block lg:hidden">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
                            >
                              View profile{" "}
                              <i className="float-right ri-user-2-line"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
                            >
                              Archive{" "}
                              <i className="float-right ri-archive-line"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
                            >
                              Muted{" "}
                              <i className="float-right ri-volume-mute-line"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100/30 dark:hover:bg-zinc-700"
                            >
                              Delete{" "}
                              <i className="float-right ri-delete-bin-line"></i>
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chat Conversation */}
          <div className="h-[80vh] p-4 lg:p-6 overflow-y-auto">
            <ul>
              <li className="py-4">
                <div className="flex items-end gap-3">
                  <Image
                    src="/assets/images/users/avatar-4.jpg"
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex gap-2 mb-2">
                      <div className="relative px-5 py-3 text-white bg-green-500 rounded-lg">
                        <p>Good morning</p>
                        <p className="mt-1 text-xs text-right text-white/50">
                          <i className="ri-time-line"></i> 10:00
                        </p>
                      </div>
                    </div>
                    <div className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                      Doris Brown
                    </div>
                  </div>
                </div>
              </li>
              {/* Add more messages similarly */}
            </ul>
          </div>

          {/* Chat Input */}
          <div className="p-6 bg-white border-t border-gray-50 dark:bg-zinc-800 dark:border-zinc-700">
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full border-0 rounded bg-gray-50 dark:bg-zinc-700 dark:text-gray-300 placeholder:text-sm text-sm"
                placeholder="Enter Message..."
              />
              <ul className="flex gap-2">
                <li>
                  <button className="text-green-500 text-lg">
                    <i className="ri-emotion-happy-line"></i>
                  </button>
                </li>
                <li>
                  <button className="text-green-500 text-lg">
                    <i className="ri-attachment-line"></i>
                  </button>
                </li>
                <li>
                  <button className="text-white bg-green-500 rounded px-2 py-1">
                    <i className="ri-send-plane-2-fill"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Audio Modal */}
          {audioModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-zinc-700 rounded-lg shadow-xl max-w-lg w-full p-6">
                <div className="text-center">
                  <Image
                    src="/assets/images/users/avatar-4.jpg"
                    alt=""
                    width={96}
                    height={96}
                    className="rounded-full mx-auto mb-6"
                  />
                  <h5 className="text-gray-800 dark:text-gray-50">
                    Doris Brown
                  </h5>
                  <p className="text-gray-500 dark:text-gray-300">
                    Start Audio Call
                  </p>
                  <ul className="flex justify-center mt-10 gap-4">
                    <li>
                      <button
                        className="w-12 h-12 bg-red-500 text-white rounded-full"
                        onClick={() => setAudioModalOpen(false)}
                      >
                        <i className="ri-close-fill text-xl"></i>
                      </button>
                    </li>
                    <li>
                      <button className="w-12 h-12 bg-green-500 text-white rounded-full">
                        <i className="ri-phone-fill text-xl"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Video Modal */}
          {videoModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-zinc-700 rounded-lg shadow-xl max-w-lg w-full p-6">
                <div className="text-center">
                  <Image
                    src="/assets/images/users/avatar-4.jpg"
                    alt=""
                    width={96}
                    height={96}
                    className="rounded-full mx-auto mb-6"
                  />
                  <h5 className="text-gray-800 dark:text-gray-50">
                    Doris Brown
                  </h5>
                  <p className="text-gray-500 dark:text-gray-300">
                    Start Video Call
                  </p>
                  <ul className="flex justify-center mt-10 gap-4">
                    <li>
                      <button
                        className="w-12 h-12 bg-red-500 text-white rounded-full"
                        onClick={() => setVideoModalOpen(false)}
                      >
                        <i className="ri-close-fill text-xl"></i>
                      </button>
                    </li>
                    <li>
                      <button className="w-12 h-12 bg-green-500 text-white rounded-full">
                        <i className="ri-vidicon-fill text-xl"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserChat;
