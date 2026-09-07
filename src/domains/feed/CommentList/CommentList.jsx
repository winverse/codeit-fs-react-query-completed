'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Button } from '@/components/Button';
import { Comment } from '@/domains/feed/Comment';
import { CommentForm } from '@/domains/feed/CommentForm';
import { addComment, getCommentsByPostId } from '@/lib/api';
import { COMMENTS_PAGE_LIMIT } from '@/lib/constants';
import { queryKeys } from '@/lib/queryKeys';
import * as styles from './CommentList.css.js';

function CommentList({ currentUserInfo, postId }) {
  const [page, setPage] = useState(0);
  const [isPagePending, startPageTransition] = useTransition();
  const queryClient = useQueryClient();

  // 1. 댓글 목록을 페이지 단위로 조회합니다.
  const { data: commentsData } = useSuspenseQuery({
    queryKey: queryKeys.posts.commentsPage(postId, page),
    queryFn: () => getCommentsByPostId(postId, page, COMMENTS_PAGE_LIMIT),
  });

  // 2. 다음 페이지가 있을 때만 미리 가져와 이동 지연을 줄입니다.
  useEffect(() => {
    if (!commentsData?.hasMore) {
      return;
    }

    queryClient
      .query({
        queryKey: queryKeys.posts.commentsPage(postId, page + 1),
        queryFn: () =>
          getCommentsByPostId(postId, page + 1, COMMENTS_PAGE_LIMIT),
      })
      .catch(() => {});
  }, [commentsData?.hasMore, queryClient, postId, page]);

  const comments = commentsData.results;

  const addCommentMutation = useMutation({
    mutationFn: (newComment) => addComment(postId, newComment),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.comments(postId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.posts.commentCount(postId),
          exact: true,
        }),
      ]),
  });

  const handleAddComment = (newComment) => {
    setPage(0);
    addCommentMutation.mutate(newComment);
  };

  // 3. 페이지 이동 버튼을 구성합니다.
  const paginationButtons = (
    <div className={styles.pagination}>
      <Button
        disabled={isPagePending || page === 0}
        onClick={() => {
          startPageTransition(() => {
            setPage((old) => Math.max(old - 1, 0));
          });
        }}
        className={styles.paginationButton}
      >
        &lt;
      </Button>
      <Button
        disabled={isPagePending || !commentsData?.hasMore}
        onClick={() => {
          startPageTransition(() => {
            setPage((old) => old + 1);
          });
        }}
        className={styles.paginationButton}
      >
        &gt;
      </Button>
    </div>
  );

  return (
    <div className={styles.commentList}>
      <div>
        {/* 4. 댓글 목록을 렌더링합니다. */}
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        {page > 0 || commentsData.hasMore ? paginationButtons : null}
      </div>

      <CommentForm
        currentUserInfo={currentUserInfo}
        onSubmit={handleAddComment}
        buttonDisabled={!currentUserInfo}
      />
    </div>
  );
}

export default CommentList;
