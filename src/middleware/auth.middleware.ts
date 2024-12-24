import { NextFunction, Request, Response } from 'express';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  // TODO: Implement token verification logic
  const token = req.headers.authorization?.split(' ')[1];

  return next;
}
