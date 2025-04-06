// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./AppProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConversationView } from "@/components/ConversationView";
import { BotProvider, useBot } from "@/context/BotContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AIverse - Your Unified AI Playground",
  description:
    "Chat with multiple popular LLMs like GPT, Grok, Gemini, and Qwen in a single app with universal context awareness.",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-neutral-900 font-sans">
        <AppProvider>
          <BotProvider>
            <SidebarProvider
              style={{
                "--sidebar-width": "450px",
              }}
            >
              {children}
            </SidebarProvider>
          </BotProvider>
        </AppProvider>
      </body>
    </html>
  );
}
