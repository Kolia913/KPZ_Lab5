"use client";

import { RQGlobalConfig } from "@/utils/RQGlobalConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient(RQGlobalConfig));

  return (
    <QueryClientProvider client={client}>
      {children}
      <ToastContainer position="top-center" limit={3} newestOnTop />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
