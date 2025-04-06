// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./AppProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConversationView } from "@/components/ConversationView";
import { BotProvider, useBot } from "@/context/BotContext";

// Load the Inter font with desired subsets and assign it a CSS variable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // This CSS variable is referenced in tailwind.config.js
});

// Load Fira Code (monospace)
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code", // Assign CSS variable
  weight: ["400", "500", "700"], // Load desired weights
  display: "swap", // Improve font loading performance
});

export const metadata = {
  title: "AIverse - Your Unified AI Playground",
  description:
    "Chat with multiple popular LLMs like GPT, Grok, Gemini, and Qwen in a single app with universal context awareness.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-gray-50 dark:bg-neutral-900 font-sans">
        <AppProvider>
          <BotProvider>{children}</BotProvider>
        </AppProvider>
      </body>
    </html>
  );
}
