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

  // 1. 업로드 뮤테이션을 준비합니다.
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

  // 2. 업로드 요청을 뮤테이션으로 실행합니다.
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

  // 3. 업로드 진행 상태로 버튼을 제어합니다.
  return (
    <PostForm
      onSubmit={handleUploadPost}
      buttonDisabled={uploadPostMutation.isPending}
    />
  );
}

export default PostUploader;
