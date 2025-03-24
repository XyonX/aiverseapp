import React from "react";
import Image from "next/image";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

function getFullUrl(path) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${BACKEND_URL}${path}`;
}

const ImageBubble = ({ message, sender, userAvatar, botAvatar }) => {
  const { images, textContent } = message;

  return (
    <>
      {sender === "bot" ? (
        <li className="flex gap-x-2 sm:gap-x-4">
          <div className="shrink-0">
            <Image
              src={`${BACKEND_URL}/uploads/${botAvatar}`}
              width={36}
              height={36}
              className="rounded-full"
              alt="Bot avatar"
            />
          </div>
          <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
            <div class="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
              <p class="text-sm text-gray-800 dark:text-white">{textContent}</p>
            </div>
            <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
              {images.map((image, index) => (
                <div className="aspect-[16/9]">
                  <img
                    className="w-full h-full object-cover"
                    src={getFullUrl(image.url)}
                    alt="Deep Learning"
                  />
                </div>
              ))}
            </div>

            <div>
              <div class="sm:flex sm:justify-between">
                <div>
                  <div class="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                    <button
                      type="button"
                      class="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
                    >
                      <svg
                        class="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
                    >
                      <svg
                        class="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M17 14V2" />
                        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <svg
                      class="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M17 14V2" />
                      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                    </svg>
                    Copy
                  </button>
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <svg
                      class="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                    </svg>
                    Share
                  </button>
                </div>

                <div class="mt-1 sm:mt-0">
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <svg
                      class="size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                      />
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                    New answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      ) : (
        <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
          <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
            <div className="flex justify-end">
              <div className="grow text-end space-y-3">
                <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-2xs">
                  <p className="text-sm text-white">{textContent}</p>
                </div>
              </div>
            </div>

            <div className="ml-auto flex flex-wrap justify-end gap-1 rounded-lg overflow-hidden">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-[calc(50%-0.125rem)] aspect-[16/9]"
                >
                  {/* object-contain is also looks good */}
                  <img
                    className="w-full h-full object-cover"
                    src={getFullUrl(image.url)}
                    alt="Deep Learning"
                  />
                </div>
              ))}
            </div>

            <div>
              <div class="sm:flex sm:justify-between">
                <div>
                  <div class="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                    <button
                      type="button"
                      class="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
                    >
                      <svg
                        class="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
                    >
                      <svg
                        class="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M17 14V2" />
                        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <svg
                      class="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M17 14V2" />
                      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                    </svg>
                    Copy
                  </button>
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <svg
                      class="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                    </svg>
                    Share
                  </button>
                </div>

                <div class="mt-1 sm:mt-0">
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <svg
                      class="size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                      />
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                    New answer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <Image
              src={`${BACKEND_URL}${userAvatar}`}
              width={36}
              height={36}
              className="rounded-full"
              alt="Bot avatar"
            />
          </div>
        </li>
      )}
    </>
  );
};

export default ImageBubble;

// const ImageBubble = ({ message, sender, userAvatar, botAvatar }) => {
//   const { images, textContent } = message;
//   return (
//     <>
//       {sender === "bot" ? (
//         // Bot message (left-aligned)
//         <li className="flex gap-x-2 sm:gap-x-4">
//           <div className="shrink-0">
//             <Image
//               src={`http://localhost:3001/uploads/${botAvatar}`}
//               width={36}
//               height={36}
//               className="rounded-full"
//               alt="Bot avatar"
//             />
//           </div>
//           <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
//             <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
//               <div class="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
//                 <p class="text-sm text-gray-800 dark:text-white">
//                   {textContent}
//                 </p>
//               </div>
//               <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
//                 {images.map((image, index) => (
//                   <div className="aspect-[16/9]">
//                     <img
//                       className="w-full h-full object-cover"
//                       src={getFullUrl(image.url)}
//                       alt="Deep Learning"
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div>
//                 <div class="sm:flex sm:justify-between">
//                   <div>
//                     <div class="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
//                       <button
//                         type="button"
//                         class="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
//                       >
//                         <svg
//                           class="shrink-0 size-4"
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         >
//                           <path d="M7 10v12" />
//                           <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
//                         </svg>
//                       </button>
//                       <button
//                         type="button"
//                         class="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
//                       >
//                         <svg
//                           class="shrink-0 size-4"
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         >
//                           <path d="M17 14V2" />
//                           <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
//                         </svg>
//                       </button>
//                     </div>
//                     <button
//                       type="button"
//                       class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
//                     >
//                       <svg
//                         class="shrink-0 size-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="M17 14V2" />
//                         <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
//                       </svg>
//                       Copy
//                     </button>
//                     <button
//                       type="button"
//                       class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
//                     >
//                       <svg
//                         class="shrink-0 size-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <circle cx="18" cy="5" r="3" />
//                         <circle cx="6" cy="12" r="3" />
//                         <circle cx="18" cy="19" r="3" />
//                         <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
//                         <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
//                       </svg>
//                       Share
//                     </button>
//                   </div>

//                   <div class="mt-1 sm:mt-0">
//                     <button
//                       type="button"
//                       class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
//                     >
//                       <svg
//                         class="size-3.5"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="currentColor"
//                         viewBox="0 0 16 16"
//                       >
//                         <path
//                           fill-rule="evenodd"
//                           d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
//                         />
//                         <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
//                       </svg>
//                       New answer
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </li>
//       ) : (
//         // User message (right-aligned)
//         <li className="flex flex-row-reverse max-w-2xl mx-auto gap-x-2 sm:gap-x-4">
//           <div className="shrink-0">
//             <Image
//               src={`http://localhost:3001/uploads/${userAvatar}`}
//               width={36}
//               height={36}
//               className="rounded-full"
//               alt="User avatar"
//             />
//           </div>
//           <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
//             <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
//               <div class="inline-block bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
//                 <p class="text-sm text-gray-800 dark:text-white">
//                   {textContent}
//                 </p>
//               </div>
//               <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
//                 {images.map((image, index) => (
//                   <div className="aspect-[16/9]">
//                     <img
//                       className="w-full h-full object-cover"
//                       src={getFullUrl(image.url)}
//                       alt="Deep Learning"
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div>
//                 <div class="sm:flex sm:justify-between">
//                   <div>
//                     <div class="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
//                       <button
//                         type="button"
//                         class="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
//                       >
//                         <svg
//                           class="shrink-0 size-4"
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         >
//                           <path d="M7 10v12" />
//                           <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
//                         </svg>
//                       </button>
//                       <button
//                         type="button"
//                         class="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-hidden focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
//                       >
//                         <svg
//                           class="shrink-0 size-4"
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         >
//                           <path d="M17 14V2" />
//                           <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
//                         </svg>
//                       </button>
//                     </div>
//                     <button
//                       type="button"
//                       class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
//                     >
//                       <svg
//                         class="shrink-0 size-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="M17 14V2" />
//                         <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
//                       </svg>
//                       Copy
//                     </button>
//                     <button
//                       type="button"
//                       class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
//                     >
//                       <svg
//                         class="shrink-0 size-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <circle cx="18" cy="5" r="3" />
//                         <circle cx="6" cy="12" r="3" />
//                         <circle cx="18" cy="19" r="3" />
//                         <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
//                         <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
//                       </svg>
//                       Share
//                     </button>
//                   </div>

//                   <div class="mt-1 sm:mt-0">
//                     <button
//                       type="button"
//                       class="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
//                     >
//                       <svg
//                         class="size-3.5"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="currentColor"
//                         viewBox="0 0 16 16"
//                       >
//                         <path
//                           fill-rule="evenodd"
//                           d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
//                         />
//                         <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
//                       </svg>
//                       New answer
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </li>
//       )}
//     </>
//   );
// };

// export default ImageBubble;
