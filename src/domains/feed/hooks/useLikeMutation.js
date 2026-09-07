import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { USER_ACTION } from '@/lib/constants';
import { queryKeys } from '@/lib/queryKeys';
import { likePost, unlikePost } from '@/lib/api';

export function useLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    // 1단계: onMutate
    // 요청 직전에 실행되며, 취소/스냅샷/낙관적 반영을 처리합니다.
    onMutate: async ({ postId, username, userAction }) => {
      // (1-1) 진행 중인 관련 조회를 먼저 취소합니다.
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: queryKeys.posts.likeStatus(postId, username),
          exact: true,
        }),
        queryClient.cancelQueries({
          queryKey: queryKeys.posts.likeCount(postId),
          exact: true,
        }),
      ]);

      // (1-2) 롤백을 위해 이전 캐시 값을 스냅샷으로 저장합니다.
      const previousLikeStatus = queryClient.getQueryData(
        queryKeys.posts.likeStatus(postId, username),
      );
      const previousLikeCount = queryClient.getQueryData(
        queryKeys.posts.likeCount(postId),
      );

      // (1-3) 서버 응답 전에 UI를 먼저 반영합니다(낙관적 업데이트).
      queryClient.setQueryData(
        queryKeys.posts.likeStatus(postId, username),
        () => userAction === USER_ACTION.LIKE_POST,
      );
      queryClient.setQueryData(
        queryKeys.posts.likeCount(postId),
        (previousLikeCountValue) => {
          const base = Number.isInteger(previousLikeCountValue)
            ? previousLikeCountValue
            : 0;
          return userAction === USER_ACTION.LIKE_POST
            ? base + 1
            : Math.max(0, base - 1);
        },
      );

      // (1-4) 실패 시 복구할 수 있도록 스냅샷을 onMutate 결과로 반환합니다.
      return { previousLikeStatus, previousLikeCount };
    },

    // 2단계: mutationFn
    // 실제 서버 변경 요청을 실행합니다.
    mutationFn: async ({ postId, username, userAction }) => {
      const likeActionFn =
        userAction === USER_ACTION.LIKE_POST ? likePost : unlikePost;
      await likeActionFn(postId, username);
    },

    // 3단계: onError
    // 실패 시 onMutate에서 저장한 스냅샷으로 롤백합니다.
    onError: (
      _error,
      { postId, username },
      onMutateResult, // onMutate가 반환한 이전 스냅샷 값입니다.
    ) => {
      // 스냅샷이 있으면 이전 캐시 값으로 복구합니다.
      if (onMutateResult) {
        queryClient.setQueryData(
          queryKeys.posts.likeStatus(postId, username),
          onMutateResult.previousLikeStatus,
        );
        queryClient.setQueryData(
          queryKeys.posts.likeCount(postId),
          onMutateResult.previousLikeCount,
        );
      }
      toast('좋아요 처리에 실패했습니다.');
    },

    // 4단계: onSettled
    // 성공/실패와 무관하게 마지막에 서버 기준으로 최종 동기화합니다.
    onSettled: (_data, _error, { postId, username }) =>
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
  });
}
