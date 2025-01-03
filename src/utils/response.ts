import { Response } from 'express';
import { CONFIG, StatusCode } from '../config';
import { getDateTime } from './time';
import { CustomError } from './error';

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

export const responseError = (res: Response, error: CustomError) => {
  const timestamp = getDateTime('zh-TW');

  if (CONFIG.debug) {
    const cleanStack = (stack: string | undefined) => {
      if (!stack) return undefined;
      return stack.split('\n').filter((line) => line.trim().startsWith('at'));
    };

    return res.status(error.statusCode).json({
      success: false,
      code: error.errorCode,
      message: error.serialize().message,
      error: cleanStack(error.stack),
      timestamp,
    });
  }

  return res.status(error.statusCode).json({
    success: false,
    code: error.errorCode,
    message: error.message,
    timestamp,
  });
};
