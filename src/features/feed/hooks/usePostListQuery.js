import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "@/lib/api";
import { FEED_VARIANT, POSTS_PAGE_LIMIT } from "@/lib/constants";
import { queryKeys } from "@/lib/queryKeys";

// 1. 피드 종류에 맞는 캐시 키를 고릅니다.
function getPostListQueryKey({ variant, currentUsername }) {
  if (variant === FEED_VARIANT.MY_FEED) {
    return queryKeys.posts.byUser(currentUsername);
  }

  return queryKeys.posts.list();
}

// 2. 피드 종류에 맞는 API 함수로 한 페이지를 받아 옵니다.
function fetchPostListPage({ variant, currentUsername, pageParam }) {
  if (variant === FEED_VARIANT.MY_FEED) {
    return getPostsByUsername(currentUsername, pageParam, POSTS_PAGE_LIMIT);
  }

  return getPosts(pageParam, POSTS_PAGE_LIMIT);
}

function usePostListQuery({ variant, currentUsername }) {
  return useSuspenseInfiniteQuery({
    queryKey: getPostListQueryKey({ variant, currentUsername }),
    queryFn: ({ pageParam }) =>
      fetchPostListPage({ variant, currentUsername, pageParam }),
    initialPageParam: 0,
    // 3. 서버에 다음 페이지가 있을 때만 번호를 1 늘립니다.
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
}

export default usePostListQuery;
