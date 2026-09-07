'use client';

import { Container } from '@/components/Container';
import { QueryBoundary } from '@/components/QueryBoundary';
import { PostList } from '@/domains/feed/PostList';
import { FEED_VARIANT } from '@/lib/constants';
import * as styles from './HomePage.css.js';

function HomePage() {
  return (
    <Container className={styles.container}>
      {/* PostList의 첫 조회 대기 상태를 공통 경계에서 표시합니다. */}
      <QueryBoundary>
        <PostList variant={FEED_VARIANT.HOME_FEED} />
      </QueryBoundary>
    </Container>
  );
}

export default HomePage;
