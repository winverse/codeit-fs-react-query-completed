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

// 1. QueryClient를 만드는 함수를 따로 둡니다.
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

// 2. 서버와 브라우저에서 QueryClient를 만드는 방법을 나눕니다.
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
  // 3. 앱 전역에서 공유할 QueryClient 인스턴스를 가져옵니다.
  const queryClient = getQueryClient();

  return (
    // 4. QueryClientProvider로 LoginProvider와 Devtools를 함께 감쌉니다.
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
