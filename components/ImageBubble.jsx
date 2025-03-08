import React from "react";

const BASE_URL = process.env.BACKEND_BASE_URL || "http://localhost:3001";

function getFullUrl(path) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

function ImageBubble({ message }) {
  const { images } = message;
  return (
    <ul className="relative mb-0">
      {images.map((image, index) => (
        <div key={index} className="relative inline-block mr-2">
          {/* Add wrapper div with min-width */}
          <div className="m-1 min-w-[100px]">
            <a
              className="inline-block popup-img"
              href={getFullUrl(image.url)}
              title={image.title}
            >
              {/* Use explicit width/height and object-cover */}
              <img
                src={getFullUrl(image.thumbnail)}
                alt=""
                className="border rounded h-28 w-28 object-cover"
              />
            </a>
          </div>
          <div className="absolute right-[10px] left-auto bottom-[10px]">
            <ul>
              <li className="inline-block p-2">
                <a
                  download={image.filename}
                  href={getFullUrl(image.url)}
                  className="font-medium"
                >
                  <i className="text-lg ri-download-2-line"></i>
                </a>
              </li>
              <li className="relative self-start inline-block p-2 dropdown">
                <a
                  className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="text-lg text-white ri-more-2-fill"></i>
                </a>
                <div
                  className="absolute z-50 hidden w-40 py-2 my-10 text-left list-none bg-white border-none rounded shadow-lg ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-gray-600/50"
                  aria-labelledby="dropdownMenuButton19"
                >
                  <a
                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                    href="#"
                  >
                    Copy{" "}
                    <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-file-copy-line"></i>
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
              </li>
            </ul>
          </div>
        </div>
      ))}
    </ul>
  );
}

export default ImageBubble;
