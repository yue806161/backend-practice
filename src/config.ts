import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'prod' ? '../.env.prod' : '../.env.dev';
dotenv.config({ path: envFile });

// 讀取常數
export const CONFIG = {
  mongo: process.env.MONGO_URL,
  debug: process.env.DEBUG === 'true',
};

export enum StatusCode {
  // 標準 HTTP 狀態碼
  OK = 200,
  CREATED = 201,
  REDIRECT = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,

  // 自訂義狀態碼
  RESOURCE_ALREADY_EXISTS = 1001,
  INVALID_INPUT = 1002,
  UNAUTHORIZED_ACCESS = 1003,
  FORBIDDEN = 1004,
  RESOURCE_NOT_FOUND = 1005,
}

export const CONST = {
  ip_regex: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
};
