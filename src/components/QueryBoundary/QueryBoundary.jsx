"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { Warn } from "@/components/Warn";
import * as styles from "./QueryBoundary.css.js";

function DefaultErrorFallback({ onRetry }) {
  return (
    <div className={styles.errorFallback}>
      <Warn
        variant="big"
        title="문제가 발생했습니다."
        description="잠시 후 다시 시도해 주세요."
      />
      <Button onClick={onRetry} className={styles.retryButton}>
        다시 시도
      </Button>
    </div>
  );
}

function QueryBoundary({ children }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <DefaultErrorFallback onRetry={resetErrorBoundary} />
          )}
        >
          <Suspense
            fallback={
              <Loading
                title="로딩 중입니다..."
                description="잠시만 기다려주세요."
              />
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default QueryBoundary;
