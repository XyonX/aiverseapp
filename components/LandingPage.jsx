import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Layers,
  Zap,
  Check,
  Brain,
  Sparkles,
  Globe,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatDemo from "@/components/chat-demo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/AppProvider";

const LandingPage = () => {
  const router = useRouter();
  const { loginAsGuest } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to AIverse
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Your unified AI playground. Chat with multiple AI models in one place.
            </p>
          </div>
          <div className="space-x-4">
            <Button
              className="px-8"
              onClick={() => router.push("/register")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="px-8"
              onClick={loginAsGuest}
            >
              Try as Guest
            </Button>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-black bg-opacity-50 rounded-full">
                  {feature.icon}
                </div>
                <h2 className="text-xl font-bold">{feature.title}</h2>
                <p className="text-zinc-200 dark:text-zinc-100">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Multiple AI Models",
    description: "Chat with various AI models including GPT, Claude, and more all in one place.",
    icon: (
      <svg
        className=" h-6 w-6 text-white"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <path d="M7 7h.01" />
      </svg>
    ),
  },
  {
    title: "Universal Context",
    description: "Maintain conversation context across different AI models seamlessly.",
    icon: (
      <svg
        className=" h-6 w-6 text-white"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </svg>
    ),
  },
  {
    title: "File Sharing",
    description: "Share and discuss files with AI models for enhanced collaboration.",
    icon: (
      <svg
        className=" h-6 w-6 text-white"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <path d="M7 7h.01" />
      </svg>
    ),
  },
];

export default LandingPage; 