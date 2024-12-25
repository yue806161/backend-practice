import { ErrorCode } from '../config';

export class BaseError extends Error {
  constructor(message: string, public code: number, public statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthError extends BaseError {
  constructor(message: string, code = ErrorCode.UNAUTHORIZED_ACCESS, statusCode = 401) {
    super(message, code, statusCode);
  }
}

export class ClientError extends BaseError {
  constructor(message: string, code = ErrorCode.INVALID_INPUT, statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class DatabaseError extends BaseError {
  constructor(message: string, code = ErrorCode.DATABASE_ERROR, statusCode = 500) {
    super(message, code, statusCode);
  }
}
