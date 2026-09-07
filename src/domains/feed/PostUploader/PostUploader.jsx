'use client';

import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadPost } from '@/lib/api';
import { PostForm } from '@/domains/feed/PostForm';
import { useLoginContext } from '@/contexts/LoginContext';
import { queryKeys } from '@/lib/queryKeys';

function PostUploader() {
  const { currentUsername } = useLoginContext();
  const queryClient = useQueryClient();

  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => uploadPost(newPost),
    onSuccess: (_data, newPost) => {
      const affectedQueryKeys = [
        queryKeys.posts.list(),
        queryKeys.posts.byUser(newPost.username),
      ];

      return Promise.all(
        affectedQueryKeys.map((queryKey) =>
          queryClient.invalidateQueries({
            queryKey,
            exact: true,
          }),
        ),
      );
    },
  });

  const handleUploadPost = (newPost) => {
    uploadPostMutation.mutate(newPost, {
      onSuccess: () => {
        toast('포스트가 성공적으로 업로드 되었습니다!');
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
