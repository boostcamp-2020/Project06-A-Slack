export const TIME = {
  FIVE_MINUTE: 60 * 5,
  TWO_MONTH: 60 * 60 * 24 * 60,
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
  WRONG_PARAMS: '올바르지 않은 매개변수',
  INVALID_EMAIL: '유효하지 않은 이메일',
  SEND_EMAIL_FAILED: '인증 메일 전송 실패',
  CODE_GENERATION_FAILED: '인증 코드 생성 실패',
};
