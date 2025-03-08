import React from "react";

function MessageActions({ message }) {
  return (
    <div className="relative self-start dropdown">
      <a
        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
      >
        <i className="ri-more-2-fill"></i>
      </a>
      <div className="absolute z-50 hidden w-40 py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg ltr:left-auto ltr:right-0 xl:ltr:left-0 xl:ltr:right-auto rtl:left-0 rtl:right-auto xl:rtl:right-0 xl:rtl:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-gray-600/50">
        <a
          className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
          href="#"
        >
          Copy{" "}
          <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-file-copy-line"></i>
        </a>
        <a
          className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
          href="#"
        >
          Save{" "}
          <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line"></i>
        </a>
        <a
          className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
          href="#"
        >
          Forward{" "}
          <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line"></i>
        </a>
        <a
          className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
          href="#"
        >
          Delete{" "}
          <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line"></i>
        </a>
      </div>
    </div>
  );
}

export default MessageActions;
