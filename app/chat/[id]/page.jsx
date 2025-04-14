"use client";
import React from "react";

import ConversationArea from "@/components/final/ConversationArea";

const NewChatPage = () => {
  // return <ConversationView bot={selectedAIContact} />;

  if (!selectedAIContact) {
    return <DiscoverView />;
  }
  return <ConversationArea />;
};

export default NewChatPage;
