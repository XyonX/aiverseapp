import { MessageBubble } from "./MessageBubble";
import { TextMessage } from "./TextMessage";
import { CodeBlockMessage } from "./CodeBlockMessage";
import { FileMessage } from "./FileMessage";
import { VoiceMessage } from "./VoiceMessage";
import { GeneratingIndicator } from "./GeneratingIndicator";

export function MessageContainer({
  messages,
  onBookmark,
  onReaction,
  onCopy,
  onRegenerate,
}) {
  const renderMessageContent = (message) => {
    // Voice message
    if (message.isVoiceMessage) {
      return (
        <VoiceMessage
          duration={message.voiceDuration || "0:00"}
          role={message.role}
        />
      );
    }

    // Files
    if (message.files && message.files.length > 0) {
      return (
        <>
          <FileMessage files={message.files} />
          {message.content && (
            <CodeBlockMessage content={message.content} onCopy={onCopy} />
          )}
        </>
      );
    }

    // Generating message
    if (message.status === "generating") {
      return (
        <>
          <CodeBlockMessage content={message.content} onCopy={onCopy} />
          <GeneratingIndicator />
        </>
      );
    }

    // Regular message with potential code blocks
    if (message.content.includes("```")) {
      return <CodeBlockMessage content={message.content} onCopy={onCopy} />;
    }

    // Plain text message
    return <TextMessage content={message.content} />;
  };

  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          id={message.id}
          role={message.role}
          timestamp={message.timestamp}
          isBookmarked={message.isBookmarked}
          reactions={message.reactions}
          status={message.status}
          onBookmark={onBookmark}
          onReaction={onReaction}
          onCopy={onCopy}
          onRegenerate={message.role === "assistant" ? onRegenerate : undefined}
          textToCopy={message.content}
          content={renderMessageContent(message)}
        />
      ))}
    </div>
  );
}
