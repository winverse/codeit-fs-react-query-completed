"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadPost } from "@/lib/api";
import { PostForm } from "@/features/feed/PostForm";
import { useLoginContext } from "@/contexts/LoginContext";
import { queryKeys } from "@/lib/queryKeys";

function PostUploader() {
  const { currentUsername } = useLoginContext();
  const queryClient = useQueryClient();

  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => uploadPost(newPost),
    onSuccess: (_data, newPost) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.list(),
          exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.byUser(newPost.username),
          exact: true,
        }),
      ]),
  });

  const handleUploadPost = (newPost) => {
    uploadPostMutation.mutate(newPost, {
      onSuccess: () => {
        toast("포스트가 성공적으로 업로드되었습니다!");
      },
    });
  };

  if (!currentUsername) {
    return null;
  }

  return (
    <PostForm
      onSubmit={handleUploadPost}
      buttonDisabled={uploadPostMutation.isPending}
    />
  );
}

export default PostUploader;
