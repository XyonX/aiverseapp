import { MessageBubble } from "./MessageBubble";
import { TextMessage } from "./TextMessage";
import { CodeBlockMessage } from "./CodeBlockMessage";
import { FileMessage } from "./FileMessage";
import { VoiceMessage } from "./VoiceMessage";
import { GeneratingIndicator } from "./GeneratingIndicator";

export function MessageContainer({
  messages,
  onBookmark,
  onCopy,
  onRegenerate,
}) {
  const renderMessageContent = (message) => {
    // // Voice message
    // if (message.isVoiceMessage) {
    //   return (
    //     <VoiceMessage
    //       duration={message.voiceDuration || "0:00"}
    //       role={message.role}
    //     />
    //   );
    // }

    // // Files
    // if (message.files && message.files.length > 0) {
    //   return (
    //     <>
    //       <FileMessage files={message.files} />
    //       {message.content && (
    //         <CodeBlockMessage content={message.content} onCopy={onCopy} />
    //       )}
    //     </>
    //   );
    // }

    // // Generating message
    // if (message.status === "generating") {
    //   return (
    //     <>
    //       <CodeBlockMessage content={message.content} onCopy={onCopy} />
    //       <GeneratingIndicator />
    //     </>
    //   );
    // }

    // Regular message with potential code blocks
    if (message.textContent.includes("```")) {
      return <CodeBlockMessage content={message.textContent} onCopy={onCopy} />;
    }

    // Plain text message

    return <TextMessage content={message.textContent} />;
  };

  return (
    <div className="space-y-4 p-4 ">
      {messages.map((message) => {
        // Format the Date object to a readable string
        const formattedTime = new Date(message.timestamp).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        return (
          <MessageBubble
            key={message._id || `temp-${Date.now()}-${index}`}
            id={message._id}
            role={message.sender}
            timestamp={formattedTime}
            isBookmarked={message.isBookmarked}
            status={message.status}
            onBookmark={onBookmark}
            onCopy={onCopy}
            onRegenerate={message.role === "bot" ? onRegenerate : undefined}
            textToCopy={message.textContent}
            content={renderMessageContent(message)}
          />
        );
      })}
    </div>
  );
}
