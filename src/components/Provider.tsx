"use client";
import React, { PropsWithChildren, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import { isWallectConnected, loadAppartments } from "@/Blockchain.services";
import { useGlobalState, getGlobalState } from "@/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const reservated = getGlobalState("reservated");
  console.log(reservated);
  useEffect(() => {
    const service = async () => {
      await isWallectConnected();
      await loadAppartments();
    };
    service();
  }, [connectedAccount]);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Toaster position="bottom-right" />
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
