"use client";

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { DEFAULT_STALE_TIME_MS, TOAST_AUTO_CLOSE_MS } from "@/constants/time";
import { LoginProvider } from "@/contexts/LoginContext";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME_MS,
      },
    },
  });
}

let browserQueryClient;

function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

function AppProviders({ children }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        {children}
        <ToastContainer
          position="top-center"
          autoClose={TOAST_AUTO_CLOSE_MS}
          hideProgressBar={true}
        />
      </LoginProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default AppProviders;
