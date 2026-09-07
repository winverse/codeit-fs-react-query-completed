export const FEED_VARIANT = {
  HOME_FEED: 'HomeFeed',
  MY_FEED: 'MyFeed',
};

export const USERNAMES = ['codeit', 'react', 'query'];

const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;

export const USER_INFO_STALE_TIME_MS = HOUR_MS; // 유저 정보는 1시간 동안 신선하다고 가정

export const COMMENTS_PAGE_LIMIT = 3;
export const POSTS_PAGE_LIMIT = 3;

export const USER_ACTION = {
  LIKE_POST: 'likePost',
  UNLIKE_POST: 'unlikePost',
};
