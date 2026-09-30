import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { USER_ACTION } from "@/constants/feed";
import { queryKeys } from "@/lib/queryKeys";
import { likePost, unlikePost } from "@/lib/api";

function useLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, username, userAction }) => {
      const likeActionFn =
        userAction === USER_ACTION.LIKE_POST ? likePost : unlikePost;
      await likeActionFn(postId, username);
    },

    onSuccess: (_data, { postId, username }) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.likeStatus(postId, username),
          exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.likeCount(postId),
          exact: true,
        }),
      ]),

    onError: () => {
      toast("좋아요 처리에 실패했습니다.");
    },
  });
}

export default useLikeMutation;
