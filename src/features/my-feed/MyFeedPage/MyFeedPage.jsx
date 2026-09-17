"use client";

import { QueryBoundary } from "@/components/QueryBoundary";
import { PostList } from "@/features/feed/PostList";
import { PostUploader } from "@/features/feed/PostUploader";
import { Container } from "@/components/Container";
import { FEED_VARIANT } from "@/lib/constants";
import { useLoginContext } from "@/contexts/LoginContext";
import { NotLoggedInPage } from "@/features/not-logged-in/NotLoggedInPage";
import * as styles from "./MyFeedPage.css.js";

function MyFeedPage() {
  const { currentUsername } = useLoginContext();

  // 로그인하지 않았다면 내 피드 대신 로그인 안내 화면을 보여 줍니다.
  if (!currentUsername) {
    return <NotLoggedInPage />;
  }

  return (
    <Container className={styles.container}>
      <QueryBoundary>
        <PostUploader />
        <PostList variant={FEED_VARIANT.MY_FEED} />
      </QueryBoundary>
    </Container>
  );
}

export default MyFeedPage;
