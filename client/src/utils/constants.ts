export const TIME_SEC = {
  FIVE_MINUTE: 60 * 5,
  TWO_MONTH: 60 * 60 * 24 * 60,
};

export const TIME_MILLIS = {
  FIVE_MINUTE: 1000 * 60 * 5,
};

export const TOKEN_TYPE = {
  ACCESS: 'ACCESS' as const,
  REFRESH: 'REFRESH' as const,
};

export const ERROR_MESSAGE = {
  MISSING_REQUIRED_VALUES: '필수 값 누락',
  INVALID_TOKEN: '유효하지 않은 토큰',
  WRONG_PW: '올바르지 않는 비밀번호',
  WRONG_USER: '올바르지 않는 유저 아이디',
  BLACKLIST_TOKEN: '블랙리스트 토큰',
  LOGIN_REQUIRED: '로그인 필요',
};

export const USER_DEFAULT_PROFILE_URL =
  'https://user-images.githubusercontent.com/61396464/100866119-8c399c00-34db-11eb-894f-3551297f5293.png';

export const CHANNELTYPE = {
  CHANNEL: 1,
  DM: 2,
};

export const INPUT_BOX_TYPE = {
  THREAD: 'thread',
  SUBTHREAD: 'subThread',
  EDIT: 'edit',
};
