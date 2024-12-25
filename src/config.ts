import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'prod' ? '../.env.prod' : '../.env.dev';
dotenv.config({ path: envFile });

// 讀取常數
export const CONFIG = {
  mongo_url: process.env.MONGO_URL || 'mongodb://localhost:27017',
  debug: process.env.DEBUG === 'true',
};

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  REDIRECT = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export enum ErrorCode {
  // 客戶端錯誤代碼
  RESOURCE_ALREADY_EXISTS = 1001,
  INVALID_INPUT = 1002,

  // 驗證錯誤代碼
  UNAUTHORIZED_ACCESS = 1503,
  FORBIDDEN = 1504,

  // 私服器內部錯誤代碼
  RESOURCE_NOT_FOUND = 2005,
  INTERNAL_SERVER_ERROR = 2006,
  DATABASE_ERROR = 2007,
  UNKNOWN_ERROR = 2008,
}

export const CONST = {
  ip_regex: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
};
