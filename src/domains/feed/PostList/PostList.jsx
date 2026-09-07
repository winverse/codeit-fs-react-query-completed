'use client';

import { Post } from '@/domains/feed/Post';
import { FEED_VARIANT } from '@/lib/constants';
import { Button } from '@/components/Button';
import { useLoginContext } from '@/contexts/LoginContext';
import usePostListQuery from '@/domains/feed/hooks/usePostListQuery';
import * as styles from './PostList.css.js';

function PostList({ variant = FEED_VARIANT.HOME_FEED }) {
  const { currentUsername } = useLoginContext();

  // 1. 무한 쿼리 훅으로 목록 데이터를 가져옵니다.
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = usePostListQuery({ variant, currentUsername });

  // 2. 누적된 페이지 배열을 꺼냅니다.
  const postsPages = postsData.pages;

  return (
    <div className={styles.postList}>
      {/* 3. 페이지별 결과를 이어 붙여 렌더링합니다. */}
      {postsPages.map((postPage) =>
        postPage.results.map((post) => <Post key={post.id} post={post} />),
      )}
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        {isFetchingNextPage ? '더 불러오는 중...' : '더 불러오기'}
      </Button>
    </div>
  );
}

export default PostList;
