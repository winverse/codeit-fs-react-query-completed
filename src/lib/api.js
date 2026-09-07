import { POSTS_PAGE_LIMIT } from './constants';

// 1. API 기본 URL을 정합니다.
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://learn.codeit.kr/api/codestudit';

// 2. 포스트 목록 조회 함수를 만듭니다.
// Codestudit API의 페이지 기준은 0부터 시작합니다.
export async function getPosts(page = 0, limit = POSTS_PAGE_LIMIT) {
  const response = await fetch(`${BASE_URL}/posts?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts.');
  }

  return await response.json();
}

// 3. 사용자별 포스트 목록 조회 함수를 만듭니다.
export async function getPostsByUsername(
  username,
  page = 0,
  limit = POSTS_PAGE_LIMIT,
) {
  const response = await fetch(
    `${BASE_URL}/posts?username=${username}&page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts by username.');
  }

  return await response.json();
}

// 4. 포스트 업로드 함수를 만듭니다.
export async function uploadPost(newPost) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error('Failed to upload the post.');
  }

  return await response.json();
}

// 5. 사용자와 댓글 조회 함수를 준비합니다.
export async function getUserInfo(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user info.');
  }

  return await response.json();
}

// 6. 포스트별 댓글 개수 조회 함수를 만듭니다.
export async function getCommentCountByPostId(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);

  if (!response.ok) {
    throw new Error('Failed to fetch comment count.');
  }

  const body = await response.json();
  return body.count;
}

// 7. 포스트별 댓글 목록 조회 함수를 만듭니다.
export async function getCommentsByPostId(postId, page = 0, limit) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/comments?page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch comments.');
  }

  return await response.json();
}

// 8. 댓글 작성 함수를 만듭니다.
export async function addComment(postId, newComment) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    throw new Error('Failed to add the comment.');
  }
  return await response.json();
}

// 9. 좋아요 관련 함수를 준비합니다.
export async function getLikeCountByPostId(postId, signal) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/likes`, { signal });

  if (!response.ok) {
    throw new Error('Failed to fetch like count.');
  }

  const body = await response.json();
  return body.count;
}

// 10. 좋아요 여부 조회 함수를 만듭니다.
export async function getLikeStatusByUsername(postId, username, signal) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/likes/${username}`,
    { signal },
  );
  if (response.status === 200) {
    return true;
  }
  if (response.status === 404) {
    return false;
  }
  throw new Error('Failed to get like status of the post.');
}

// 11. 좋아요 추가 함수를 만듭니다.
export async function likePost(postId, username) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/likes/${username}`,
    {
      method: 'POST',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to like the post.');
  }
}

// 12. 좋아요 취소 함수를 만듭니다.
export async function unlikePost(postId, username) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/likes/${username}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to unlike the post.');
  }
}
