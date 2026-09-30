import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "@/lib/api";
import { FEED_VARIANT } from "@/constants/feed";
import { POSTS_PAGE_LIMIT } from "@/constants/pagination";
import { queryKeys } from "@/lib/queryKeys";

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
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
}

export default usePostListQuery;
