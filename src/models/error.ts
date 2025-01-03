import { ErrorCode, StatusCode } from '../config';
import { CustomError } from '../utils/error';

export class ServerError extends CustomError {
  constructor(
    message: string,
    public errorCode: ErrorCode,
    public isOperational = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
  statusCode = StatusCode.INTERNAL_SERVER_ERROR;

  serialize() {
    return { message: this.message };
  }
}

export class DatabaseError extends CustomError {
  constructor(
    message: string,
    public errorCode: ErrorCode = ErrorCode.DATABASE_ERROR,
    public isOperational = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
  statusCode = StatusCode.INTERNAL_SERVER_ERROR;
  serialize() {
    return { message: this.message };
  }
}

export class ClientError extends CustomError {
  constructor(
    message: string,
    public errorCode: ErrorCode = ErrorCode.INVALID_INPUT,
    public isOperational = true,
    public field?: string
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ClientError.prototype);
  }
  statusCode = StatusCode.BAD_REQUEST;
  serialize() {
    if (this.errorCode === ErrorCode.INVALID_INPUT) {
      return this.serializeZOD();
    }
    return { message: this.message };
  }
  private serializeZOD() {
    const a = JSON.parse(this.message);
    const message: string[] = a.map((item: { path: string[]; message: string }) => `${item.path.join(', ')}: ${item.message}`);
    return { message };
  }
}

export class AuthError extends CustomError {
  constructor(
    message: string,
    public errorCode: ErrorCode = ErrorCode.INVALID_INPUT,
    public isOperational = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ClientError.prototype);
  }
  statusCode = StatusCode.UNAUTHORIZED;
  serialize() {
    return { message: this.message };
  }
}
