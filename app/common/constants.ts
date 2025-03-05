// * locale
export const LANGUAGES = ['en-US', 'ko-KR'] as const;
export const DEFAULT_LANGUAGE = 'en-US';

// * theme
export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

// * Bigint
declare global {
  interface BigInt {
    toJSON(): string;
  }
}
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// * 거래소
export enum Exchange {
  BITGET = 'bitget', // Bitget
  BYBIT = 'bybit', // Bybit
  OKX = 'okx', // OKX
  BINGX = 'bingx', // BingX
  HTX = 'htx', // HTX
  LBANK = 'lbank', // LBank
}

// * 공용 활성화 상태
export enum CommonStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// * 인증 시간
export const VERIFICATION_CODE_EXPIRATION_TIME = 1000 * 60 * 5; // 5분

// * Asset
export enum Asset {
  POINT = 'point',
  REWARD = 'reward',
  USDT = 'USDT',
  KRW = 'KRW',
}

// 게임
export enum Game {
  CHALLENGE = 'challenge',
  RACE = 'race',
}

// 레이스 팀
export enum RaceTeamEnum {
  RED = 'red',
  BLUE = 'blue',
}

// 포인트 박스 등급
export enum BoxGrade {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
}
