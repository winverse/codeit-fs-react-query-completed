const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;

export const TOAST_AUTO_CLOSE_MS = 2 * SECOND_MS;

export const DEFAULT_STALE_TIME_MS = MINUTE_MS; // 따로 정하지 않은 조회는 1분 동안 신선하다고 가정
export const USER_INFO_STALE_TIME_MS = HOUR_MS; // 사용자 정보는 1시간 동안 신선하다고 가정
