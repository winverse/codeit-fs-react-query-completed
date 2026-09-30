import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { POSTS_PAGE_LIMIT } from "@/constants/pagination";
import { getPosts } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { HomePage } from "@/features/home/HomePage";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.infiniteQuery({
    queryKey: queryKeys.posts.list(),
    queryFn: ({ pageParam }) => getPosts(pageParam, POSTS_PAGE_LIMIT),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
