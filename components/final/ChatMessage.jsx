import React from "react";

const ChatMessage = ({ message }) => {
  const { sender, content, timestamp, isOutgoing, code } = message;

  // Determine alignment and bubble specific styles based on sender
  const alignment = isOutgoing ? "items-end" : "items-start";
  const bubbleSpecificRadius = isOutgoing
    ? "rounded-tr-none"
    : "rounded-tl-none";
  const bubbleBg = isOutgoing
    ? "bg-chat-bubble-outgoing"
    : "bg-chat-bubble-incoming";
  const bubbleText = isOutgoing
    ? "text-chat-bubble-outgoing-foreground"
    : "text-chat-bubble-incoming-foreground";
  const senderRowAlignment = isOutgoing ? "flex-row-reverse" : "";

  return (
    <div className={`flex flex-col group ${alignment}`}>
      {/* Sender Info Row */}
      <div className={`flex items-center gap-2 ${senderRowAlignment} mb-1`}>
        {/* Avatar Placeholder/Component */}
        <div
          className={`flex-shrink-0 size-6 rounded-full bg-muted border border-border/50 flex items-center justify-center text-muted-foreground text-xs`}
        >
          {/* Replace with <Avatar src={...} /> later */}
          {sender.substring(0, 1)} {/* Basic Initial */}
        </div>
        <span className="text-xs text-muted-foreground">{sender}</span>
        <span className="text-xs text-muted-foreground/60">{timestamp}</span>
      </div>

      {/* Bubble Container - Ensures bubble doesn't exceed its max-width */}
      <div
        className={`flex max-w-full ${
          isOutgoing ? "justify-end" : "justify-start"
        }`}
      >
        {/* The Actual Chat Bubble */}
        <div
          className={`
                        max-w-xl md:max-w-2xl   /* MAX WIDTH FOR THE BUBBLE ITSELF */
                        py-2 px-4              /* Padding inside bubble */
                        rounded-lg             /* Base rounding */
                        ${bubbleSpecificRadius} /* Specific corner flattening */
                        ${bubbleBg}            /* Background color */
                        ${bubbleText}          /* Text color */
                        transition-colors duration-150 /* Smooth hover (optional) */
                        shadow-sm              /* Subtle shadow */
                     `}
        >
          {/* Message Content Area - Apply prose here */}
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-pre:my-2">
            {/* --- Content Rendering --- */}
            {/* Use ReactMarkdown or similar here for rich text */}

            {/* Simple text rendering for now: */}
            <p className="whitespace-pre-wrap break-words">{content}</p>

            {/* Conditional Code Block Rendering */}
            {code && (
              // Use <pre><code> which gets styled by the prose config
              <pre className="font-mono">
                <code className="language-jsx">
                  {/* Add language class if known */}
                  {code}
                </code>
              </pre>
              // --- OR Use Syntax Highlighter Component ---
              /*
                            <div className="my-2 rounded-md overflow-hidden">
                                 <SyntaxHighlighter
                                     language="jsx" // Or detect language
                                     style={atomDark} // Choose your highlighter theme
                                     customStyle={{ margin: 0, padding: '1em', backgroundColor: 'hsl(var(--code-block-background))' }} // Override BG if needed
                                     codeTagProps={{style: {fontFamily: 'var(--font-fira-code)', fontSize: '0.875rem'}}}
                                 >
                                     {code}
                                </SyntaxHighlighter>
                            </div>
                            */
            )}
            {/* --- End Content Rendering --- */}
          </div>
        </div>
      </div>

      {/* Action Buttons (Appear on Hover - Conditionally Render) */}
      {/* <div className="mt-1 flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                Add copy, edit, delete buttons here using theme colors (e.g., text-muted-foreground hover:text-accent-foreground)
            </div> */}
    </div>
  );
};

export default ChatMessage;
