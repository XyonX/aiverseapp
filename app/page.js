"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "./AppProvider";
import LandingPage from "@/components/LandingPage";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      router.push("/chat");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-border/50 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div>
            <span className="text-xl font-bold text-foreground">AIverse</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#models"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              AI Models
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="px-0 py-0 flex justify-center md:px-1">
              <ThemeToggle />
            </div>
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-foreground">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Landing Page Content */}
      <LandingPage />
    </div>
  );
}
