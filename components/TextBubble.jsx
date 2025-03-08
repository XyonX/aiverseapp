import React from "react";

function TextBubble({ message }) {
  const processContent = (text) => {
    const lines = text.split("\n");
    const elements = [];
    let isCodeBlock = false;
    let codeContent = [];

    const processLine = (line, index) => {
      if (line.startsWith("```")) {
        // Code block handling remains the same
        // ... (keep existing code block logic)
      }

      if (isCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // Handle headings
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-bold mb-2 mt-4">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-bold mb-2 mt-4">
            {line.replace("## ", "")}
          </h2>
        );
      }

      // Improved bold formatting handling
      let processedLine = line
        // Handle bold with **
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        // Handle italic with *
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        // Handle inline code
        .replace(
          /`([^`]+)`/g,
          '<code className="bg-gray-100 px-1 rounded">$1</code>'
        );

      // Handle list items
      if (/^[\-\*] /.test(processedLine)) {
        return (
          <li key={index} className="list-disc ml-6 my-1">
            <span
              dangerouslySetInnerHTML={{ __html: processedLine.slice(2) }}
            />
          </li>
        );
      }

      // Handle paragraphs with mixed formatting
      return (
        <p
          key={index}
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    };

    return lines.map((line, index) => processLine(line, index));
  };

  return (
    <div className="text-gray-800 text-sm [&_strong]:font-semibold [&_em]:italic [&_code]:font-mono">
      {processContent(message.textContent)}
    </div>
  );
}
export default TextBubble;
