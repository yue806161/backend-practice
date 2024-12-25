import { ZodError } from 'zod';
import { AuthError, ClientError, DatabaseError } from '../models/error.model';
import { StatusCode } from '../config';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ErrorService {
  static handle(error: unknown) {
    if (error instanceof ZodError) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        message: 'Invalid request body.',
        error,
      };
    }

    if (error instanceof ClientError) {
      return {
        statusCode: error.statusCode,
        message: error.message,
        error,
      };
    }

    if (error instanceof DatabaseError) {
      return {
        statusCode: error.statusCode,
        message: 'Database operation failed.',
        error,
      };
    }

    if (error instanceof AuthError) {
      return {
        statusCode: error.statusCode,
        message: 'Authentication failed.',
        error,
      };
    }

    return {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      message: 'Internal server error.',
      error,
    };
  }
}
