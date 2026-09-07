import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getPosts, getPostsByUsername } from '@/lib/api';
import { FEED_VARIANT, POSTS_PAGE_LIMIT } from '@/lib/constants';
import { queryKeys } from '@/lib/queryKeys';

const usePostListQuery = ({ variant, currentUsername }) => {
  const isMyFeed = variant === FEED_VARIANT.MY_FEED;

  // 1. 피드 종류에 맞는 캐시 키와 API 함수를 선택합니다.
  const postListQuery = useSuspenseInfiniteQuery({
    queryKey: isMyFeed
      ? queryKeys.posts.byUser(currentUsername)
      : queryKeys.posts.list(),
    queryFn: ({ pageParam }) =>
      isMyFeed
        ? getPostsByUsername(currentUsername, pageParam, POSTS_PAGE_LIMIT)
        : getPosts(pageParam, POSTS_PAGE_LIMIT),
    initialPageParam: 0,
    // 2. 서버에 다음 페이지가 있을 때만 번호를 1 늘립니다.
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.hasMore ? lastPageParam + 1 : undefined,
  });

  // 3. PostList가 실제로 사용하는 값만 반환합니다.
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    postListQuery;

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};

export default usePostListQuery;
