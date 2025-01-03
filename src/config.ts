import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev' });

// 設置
export const CONFIG = {
  mongo_url: process.env.MONGO_URL || 'mongodb://localhost:27017',
  debug: process.env.DEBUG || false,
  // debug: false,
  port: Number(process.env.PORT) || 3000,
  cookie_secret: process.env.COOKIE_SECRET || 'secret',
  jwt_secret: process.env.JWT_SECRET || 'secret',
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '1d',
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '1m',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'secret',
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

export enum DatabaseType {
  DynamoDB,
  MongoDB,
  MySQL,
}
