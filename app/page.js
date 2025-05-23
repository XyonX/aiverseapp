"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "./AppProvider";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const router = useRouter();
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      router.push("/chat");
    }
  }, [user, router]);

  // If user is authenticated, return null (middleware will handle redirect)
  if (user) {
    return null;
  }

  // Show landing page for non-authenticated users
  return <LandingPage />;
}
