'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { TextInputForm } from '@/domains/feed/TextInputForm';
import { useLoginContext } from '@/contexts/LoginContext';
import { queryKeys } from '@/lib/queryKeys';
import { getUserInfo } from '@/lib/api';
import { USER_INFO_STALE_TIME_MS } from '@/lib/constants';
import * as styles from './PostForm.css.js';

function PostForm({ onSubmit, buttonDisabled }) {
  const { currentUsername } = useLoginContext();
  // 1. 현재 사용자 정보를 쿼리로 조회합니다.
  const { data: currentUserInfo } = useSuspenseQuery({
    queryKey: queryKeys.user.info(currentUsername),
    queryFn: () => getUserInfo(currentUsername),
    staleTime: USER_INFO_STALE_TIME_MS,
  });

  // 2. 제출 시 newPost를 구성해 업로드 흐름으로 넘깁니다.
  const handleSubmit = (content) => {
    if (!currentUserInfo || currentUserInfo.username !== currentUsername) {
      return;
    }
    const newPost = {
      username: currentUserInfo.username,
      content: content,
    };

    onSubmit(newPost);
  };

  return (
    <div className={styles.textInputForm}>
      {/* 3. 입력 폼에 사용자 정보를 전달합니다. */}
      <TextInputForm
        onSubmit={handleSubmit}
        currentUserInfo={currentUserInfo}
        placeholder="오늘의 공부 기록을 남겨보세요."
        buttonText="업로드"
        buttonDisabled={buttonDisabled}
      />
    </div>
  );
}

export default PostForm;
