'use client';

import { TextInputForm } from '@/domains/feed/TextInputForm';
import * as styles from './CommentForm.css.js';

function CommentForm({ currentUserInfo, onSubmit, buttonDisabled }) {
  const handleSubmit = async (content) => {
    if (!currentUserInfo) return;
    const newComment = {
      username: currentUserInfo.username,
      content: content,
    };

    onSubmit(newComment);
  };

  return (
    <div className={styles.commentForm}>
      <TextInputForm
        onSubmit={handleSubmit}
        currentUserInfo={currentUserInfo}
        placeholder="댓글을 입력하세요."
        buttonText="댓글 달기"
        buttonDisabled={buttonDisabled || !currentUserInfo}
      />
    </div>
  );
}

export default CommentForm;
