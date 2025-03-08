import React from "react";

const Search = () => {
  return (
    <div className="px-6 pt-6">
      <h4 className="mb-0 text-gray-800 dark:text-white">Chats</h4>
      <div className="py-1 mt-5 mb-5 rounded bg-white dark:bg-neutral-900">
        <span className="pe-1 ps-3" id="basic-addon1">
          <i className="text-lg text-gray-500 dark:text-neutral-400 ri-search-line search-icon"></i>
        </span>
        <input
          type="text"
          className="border-0 bg-white dark:bg-neutral-900 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 placeholder:text-gray-500 dark:placeholder:text-neutral-400"
          placeholder="Search messages or AI contacts"
          aria-label="Search messages or AI contacts"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
  );
};

export default Search;
