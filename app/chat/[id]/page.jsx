"use client";
import React from "react";

import ConversationArea from "@/components/final/ConversationArea";

import { useAppContext } from "@/app/AppProvider";
import DiscoverView from "@/components/DiscoverView";

const NewChatPage = () => {
  // return <ConversationView bot={selectedAIContact} />;
  const { selectedAIContact } = useAppContext();

  if (!selectedAIContact) {
    return <DiscoverView />;
  }
  return <ConversationArea />;
};

export default NewChatPage;
