export const queryKeys = {
  // 1. posts 관련 키를 묶습니다.
  posts: {
    all: () => ['posts'],
    list: () => ['posts', 'list', 'all'],
    byUser: (username) => ['posts', 'list', 'user', username],
    commentCount: (postId) => ['posts', postId, 'commentCount'],
    comments: (postId) => ['posts', postId, 'comments'],
    commentsPage: (postId, page) => ['posts', postId, 'comments', page],
    likeCount: (postId) => ['posts', postId, 'likeCount'],
    likeStatus: (postId, username) => ['posts', postId, 'likeStatus', username],
  },
  // 2. user 관련 키를 묶습니다.
  user: {
    info: (username) => ['user', username],
  },
};
