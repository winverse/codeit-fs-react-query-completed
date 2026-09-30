"use client";

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { LoginProvider } from "@/contexts/LoginContext";

const ONE_MINUTE_MS = 60_000;
const TOAST_AUTO_CLOSE_MS = 2_000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: ONE_MINUTE_MS,
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
