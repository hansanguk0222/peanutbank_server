export const TIME = {
  FIVE_MINUTE: 60 * 5,
  TWO_MONTH: 60 * 60 * 24 * 60,
};

export const STRINGARRAY = 'ABCDEF0123456789';
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
  ENCRYPT_DECRYPT_FAILED: '암호화/복호화 실패',
  EXIST_EMAIL: '존재하는 이메일',
  NOT_ALLOWED_FILE_TYPE: '허용되지 않은 파일타입',
  GOOGLE_OAUTH_FAILED: '구글 OAuth 인증 실패',
  GOOGLE_OAUTH_SIGNUP_FAILED: '구글 OAuth로 회원가입 실패',
};

export const USER_DEFAULT_PROFILE_URL = 'https://user-images.githubusercontent.com/61396464/100866119-8c399c00-34db-11eb-894f-3551297f5293.png';

export const SOCKET_EVENT_TYPE = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message',
  ENTER_ROOM: 'enter_room',
  LEAVE_ROOM: 'leave_room',
};

export const SOCKET_MESSAGE_TYPE = {
  THREAD: 'thread',
  EMOJI: 'emoji',
  USER: 'user',
  CHANNEL: 'channel',
  DM: 'dm',
};

export const THREAD_SUBTYPE = {
  CREATE_THREAD: 'create_thread',
  EDIT_THREAD: 'edit_thread',
  DELETE_THREAD: 'delete_thread',
};

export const CHANNEL_SUBTYPE = {
  UPDATE_CHANNEL: 'update_channel',
  UPDATE_CHANNEL_TOPIC: 'update_channel_topic',
  UPDATE_CHANNEL_UNREAD: 'update_channel_unread',
  UPDATE_CHANNEL_USERS: 'update_channel_users',
  MAKE_DM: 'make_dm',
  FIND_AND_JOIN_CHANNEL: 'find_and_join_channel',
};
