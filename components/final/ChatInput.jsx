// src/components/chat/ChatInput.tsx
import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react"; // Send icon

// interface ChatInputProps {
//   onSendMessage: (message: string) => void; // Function to call when sending
//   isLoading?: boolean; // Optional: To disable input/button during bot response
// }

const ChatInput = ({ onSendMessage, isLoading = false }) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea height based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`; // Set to content height
      // Optional: Add max height capping
      const maxHeight = 160; // Example max height in pixels (adjust as needed)
      if (scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.overflowY = "hidden";
      }
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = () => {
    const trimmedMessage = inputValue.trim();
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage);
      setInputValue(""); // Clear input after sending
    }
  };

  const handleKeyDown = (event) => {
    // Send on Enter, allow Shift+Enter for newline
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default newline behavior
      handleSend();
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-border bg-background px-4 py-3 ">
      {/* Container to enforce max-width, matching messages */}
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1} // Start with one row, useEffect handles resizing
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className={`
                           flex-1 resize-none overflow-hidden          /* Basic textarea setup */
                           min-h-[40px]                                /* Ensure minimum height */
                           bg-muted/60 dark:bg-input                   /* Slightly different input BG */
                           text-foreground                            /* Text color */
                           border border-border                       /* Border */
                           rounded-lg                                  /* Corners */
                           px-3 py-2                                  /* Internal padding */
                           text-sm                                    /* Font size */
                           focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary /* Focus state */
                           disabled:opacity-70 disabled:cursor-not-allowed /* Disabled state */
                        `}
            style={{ maxHeight: "160px" }} // Consistent with useEffect max height check
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
            className={`
                          flex-shrink-0 p-2 size-[40px] flex items-center justify-center /* Sizing & Flex */
                          bg-primary text-primary-foreground        /* Theme colors */
                          rounded-lg                                 /* Corners */
                          transition-colors duration-150             /* Hover effect */
                          hover:bg-primary/90                        /* Hover color */
                          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background /* Focus state */
                          disabled:opacity-50 disabled:cursor-not-allowed /* Disabled state */
                       `}
          >
            {isLoading ? (
              <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span> /* Loading spinner */
            ) : (
              <SendHorizontal size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
