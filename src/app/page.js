import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { POSTS_PAGE_LIMIT } from "@/constants/pagination";
import {
  getCommentCountByPostId,
  getLikeCountByPostId,
  getPosts,
} from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { HomePage } from "@/features/home/HomePage";

export default async function Home() {
  const queryClient = new QueryClient();

  const postsData = await queryClient.infiniteQuery({
    queryKey: queryKeys.posts.list(),
    queryFn: ({ pageParam }) => getPosts(pageParam, POSTS_PAGE_LIMIT),
    initialPageParam: 0,
  });

  const firstPagePosts = postsData.pages[0].results;

  await Promise.all([
    ...firstPagePosts.map((post) =>
      queryClient
        .query({
          queryKey: queryKeys.posts.commentCount(post.id),
          queryFn: () => getCommentCountByPostId(post.id),
        })
        .catch(() => {}),
    ),
    ...firstPagePosts.map((post) =>
      queryClient
        .query({
          queryKey: queryKeys.posts.likeCount(post.id),
          queryFn: () => getLikeCountByPostId(post.id),
        })
        .catch(() => {}),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
