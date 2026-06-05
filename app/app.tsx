"use client";
import React from "react";
import { GenesisProvider } from "@gobolt/genesis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface AppProps {
  children: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GenesisProvider>{children}</GenesisProvider>
    </QueryClientProvider>
  );
};

export default App;

