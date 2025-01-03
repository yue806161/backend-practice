import { NextFunction, Request, Response } from 'express';
import { ErrorCode, StatusCode } from '../config';

export abstract class CustomError extends Error {
  abstract statusCode: StatusCode;
  abstract errorCode: ErrorCode;
  abstract serialize(): { message: string | string[]; field?: string };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function handleError(fn: Function) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
