"use client";

import React from "react";

export const BotContext = React.createContext(undefined);

export function BotProvider({ children }) {
  const [selectedBot, setSelectedBot] = React.useState(null);

  return (
    <BotContext.Provider value={{ selectedBot, setSelectedBot }}>
      {children}
    </BotContext.Provider>
  );
}

export function useBot() {
  const context = React.useContext(BotContext);
  if (context === undefined) {
    throw new Error("useBot must be used within a BotProvider");
  }
  return context;
}
