'use client';

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { LoginProvider } from '@/contexts/LoginContext';
import 'react-toastify/dist/ReactToastify.css';

const ONE_MINUTE_MS = 60_000;
const TOAST_AUTO_CLOSE_MS = 2_000;

// 1. 실행 환경마다 사용할 QueryClient를 만듭니다.
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: ONE_MINUTE_MS,
      },
    },
  });
}

let browserQueryClient = undefined;

// 2. 서버/브라우저 실행 환경에 맞게 생성 전략을 분기합니다.
function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export default function AppProviders({ children }) {
  // 3. 앱 전역에서 공유할 QueryClient 인스턴스를 가져옵니다.
  const queryClient = getQueryClient();

  return (
    // 4. QueryClientProvider + LoginProvider + Devtools를 한 경계로 묶습니다.
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        {children}
        <ToastContainer
          position="top-center"
          autoClose={TOAST_AUTO_CLOSE_MS}
          hideProgressBar={true}
          theme="light"
        />
      </LoginProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}
