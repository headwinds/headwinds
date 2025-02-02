"use client";
import React from "react";
import { GenesisProvider } from "@gobolt/genesis";

interface AppProps {
  children: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  return <GenesisProvider>{children}</GenesisProvider>;
};

export default App;
