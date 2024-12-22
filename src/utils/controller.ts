import { Response } from 'express';

export const response = <T>(res: Response, status: number, outputMessage: string | unknown, data?: T, code: number = status) => {
  const success = status < 400;
  const message = outputMessage instanceof Error ? outputMessage.message : String(outputMessage);
  const payload = success ? data : { error: outputMessage };

  return res.status(status).json({
    success,
    code,
    message,
    data: payload,
  });
};
