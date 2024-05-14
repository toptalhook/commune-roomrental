"use client";
import React, { PropsWithChildren, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import { isWallectConnected, loadAppartments } from "@/Blockchain.services";
import { useGlobalState } from "@/store";
import { loadavg } from "os";

import { initCometChat } from "@/Chat";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [all_reservations] = useGlobalState("myappartments");

  const loadData = async () => {
    await isWallectConnected();
    await loadAppartments();
    await initCometChat();
  };

  useEffect(() => {
    loadData();
  }, [connectedAccount]);

  console.log(all_reservations);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
