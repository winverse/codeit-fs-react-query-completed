'use client';

import { createContext, useContext, useState } from 'react';

// 1. 로그인 상태를 공유할 컨텍스트를 만듭니다.
export const LoginContext = createContext(null);

// 2. 컨텍스트 접근을 전담하는 훅을 만듭니다.
export function useLoginContext() {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useLoginContext must be used within LoginProvider');
  }

  return context;
}

// 3. Provider에서 상태를 만들고 값을 전달합니다.
export function LoginProvider({ children }) {
  const [currentUsername, setCurrentUsername] = useState();

  const value = { currentUsername, setCurrentUsername };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
