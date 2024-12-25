import { Response } from 'express';
import { StatusCode } from '../config';
import { getDateTime } from './time';
import { BaseError } from '../models/error.model';

export const responseSuccess = <T>(res: Response, status: number, message: string, data?: T, code: StatusCode = status) => {
  const timestamp = getDateTime('zh-TW');
  return res.status(status).json({
    success: true,
    code,
    message,
    data,
    timestamp,
  });
};

export const responseError = (res: Response, status: number, message: string, error: Error | string | unknown) => {
  // const isDev = process.env.NODE_ENV === 'dev';
  const isDev = 1;
  const timestamp = getDateTime('zh-TW');

  let errorProps = {
    code: status,
    detail: 'Unknown error',
    name: 'UnknownError',
    stack: undefined as string | undefined,
  };

  // Handle different error types
  if (error instanceof BaseError) {
    status = error.statusCode;
    errorProps = {
      code: error.code,
      name: error.name,
      detail: error.message,
      stack: error.stack,
    };
  } else if (error instanceof Error) {
    errorProps = {
      ...errorProps,
      name: error.name,
      detail: error.message,
      stack: error.stack,
    };
  } else if (typeof error === 'string') {
    try {
      const parsedError = JSON.parse(error);
      errorProps = {
        code: parsedError.code || errorProps.code,
        name: parsedError.name || errorProps.name,
        detail: parsedError.message || errorProps.detail,
        stack: parsedError.stack,
      };
    } catch {
      errorProps.detail = error;
    }
  }

  const errorDetails = isDev
    ? {
        name: errorProps.name,
        detail: errorProps.detail,
        stack: errorProps.stack,
      }
    : {
        name: errorProps.name,
        detail: errorProps.detail,
      };

  return res.status(status).json({
    success: false,
    code: errorProps.code,
    message,
    error: errorDetails,
    timestamp,
  });
};
