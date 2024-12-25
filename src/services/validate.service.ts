import { Request } from 'express';
import { z } from 'zod';
import { ClientError } from '../models/error.model';
import { ErrorCode, StatusCode } from '../config';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ValidateService {
  public static RequestBody<T extends z.ZodTypeAny>(req: Request, schema: T) {
    try {
      return schema.parse(req.body) as z.infer<T>;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ClientError('Invalid request.', ErrorCode.INVALID_INPUT, StatusCode.BAD_REQUEST);
    }
  }

  public static RequestParams<T extends z.ZodTypeAny>(req: Request, schema: T) {
    try {
      return schema.parse(req.params) as z.infer<T>;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ClientError('Invalid request.', ErrorCode.INVALID_INPUT, StatusCode.BAD_REQUEST);
    }
  }

  public static RequestQuery<T extends z.ZodTypeAny>(req: Request, schema: T) {
    try {
      return schema.parse(req.query) as z.infer<T>;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ClientError('Invalid request.', ErrorCode.INVALID_INPUT, StatusCode.BAD_REQUEST);
    }
  }
}
