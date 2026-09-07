'use client';

import { QueryBoundary } from '@/components/QueryBoundary';
import { PostList } from '@/domains/feed/PostList';
import { PostUploader } from '@/domains/feed/PostUploader';
import { Container } from '@/components/Container';
import { FEED_VARIANT } from '@/lib/constants';
import { useLoginContext } from '@/contexts/LoginContext';
import { NotLoggedInPage } from '@/domains/not-logged-in/NotLoggedInPage';
import * as styles from './MyFeedPage.css.js';

function MyFeedPage() {
  const { currentUsername } = useLoginContext();

  // 1. 로그인하지 않았다면 안내 페이지로 이동합니다.
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
