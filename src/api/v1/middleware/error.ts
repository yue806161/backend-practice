import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { responseError } from '../../../utils/response';
import { CustomError } from '../../../utils/error';
import { CONFIG, ErrorCode } from '../../../config';
import { ClientError } from '../../../models/error';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ClientError(`🔍 - Not Found - ${req.originalUrl}`, ErrorCode.RESOURCE_NOT_FOUND);
  res.status(404);
  next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (CONFIG.debug) {
    // console.log('err: ', true);
  }

  return responseError(res, err);
};
