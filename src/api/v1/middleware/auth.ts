import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG, StatusCode } from '../../../config';
import { extractBearerToken } from '../../../utils/auth';
import { AuthenticatedRequest } from '../model/auth';

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const token = extractBearerToken(req.headers);
    if (!token) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, CONFIG.jwt_secret);

    req.user = decoded;

    return next;
  } catch (error) {
    next(error);
  }
}
