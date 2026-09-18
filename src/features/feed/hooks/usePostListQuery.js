import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "@/lib/api";
import { FEED_VARIANT, POSTS_PAGE_LIMIT } from "@/lib/constants";
import { queryKeys } from "@/lib/queryKeys";

// 1. 피드 종류에 맞는 캐시 키와 API 함수를 고릅니다.
function getPostListQueryOptions({ variant, currentUsername }) {
  if (variant === FEED_VARIANT.MY_FEED) {
    return {
      queryKey: queryKeys.posts.byUser(currentUsername),
      queryFn: ({ pageParam }) =>
        getPostsByUsername(currentUsername, pageParam, POSTS_PAGE_LIMIT),
    };
  }

  return {
    queryKey: queryKeys.posts.list(),
    queryFn: ({ pageParam }) => getPosts(pageParam, POSTS_PAGE_LIMIT),
  };
}

function usePostListQuery({ variant, currentUsername }) {
  const { queryKey, queryFn } = getPostListQueryOptions({
    variant,
    currentUsername,
  });

  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    // 2. 서버에 다음 페이지가 있을 때만 번호를 1 늘립니다.
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
}

export default usePostListQuery;
