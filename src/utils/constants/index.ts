import mongoose from 'mongoose';

export const TIME = {
  FIVE_MINUTE: 60 * 5,
  TWO_MONTH: 60 * 60 * 24 * 60,
};

export const COLORSTRINGARRAY = 'ABCDEF0123456789';

export const NICKNAMESTRINGARRAY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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

export const CATEGORIES = [
  {
    _id: mongoose.Types.ObjectId(),
    name: '식비',
    color: '#32a421',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '교통/차량',
    color: '#ab23f2',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '문화생활',
    color: '#56cd2e',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '마트/편의점',
    color: '#12f234',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '패션/미용',
    color: '#cc123f',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '생활용품',
    color: '#bbcc12',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '주거/통신',
    color: '#bacab2',
    isExist: true,
  },
  {
    name: '건강',
    color: '#39ad2f',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '교육',
    color: '#78c2d1',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '경조사/회비',
    color: '#3acdf8',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '부모님',
    color: '#ffa23a',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '기타',
    color: '#dd2cab',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '현금',
    color: '#23ffcd',
    isExist: true,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: '은행',
    color: '#aab3f4',
    isExist: true,
  },
];
