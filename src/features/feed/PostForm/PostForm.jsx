"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { TextInputForm } from "@/features/feed/TextInputForm";
import { useLoginContext } from "@/contexts/LoginContext";
import { queryKeys } from "@/lib/queryKeys";
import { getUserInfo } from "@/lib/api";
import { USER_INFO_STALE_TIME_MS } from "@/constants/time";
import * as styles from "./PostForm.css.js";

function PostForm({ onSubmit, buttonDisabled }) {
  const { currentUsername } = useLoginContext();
  const { data: currentUserInfo } = useSuspenseQuery({
    queryKey: queryKeys.user.info(currentUsername),
    queryFn: () => getUserInfo(currentUsername),
    staleTime: USER_INFO_STALE_TIME_MS,
  });

  const handleSubmit = (content) => {
    const newPost = {
      username: currentUserInfo.username,
      content,
    };

    onSubmit(newPost);
  };

  return (
    <div className={styles.textInputForm}>
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
