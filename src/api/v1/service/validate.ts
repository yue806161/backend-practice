import { Request } from 'express';
import { z } from 'zod';
import { ClientError } from '../../../models/error';
import { CONFIG, ErrorCode } from '../../../config';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ValidateService {
  private static validate<T extends z.ZodTypeAny>(data: unknown, schema: T, errorMessage: string): z.infer<T> {
    try {
      return schema.parse(data) as z.infer<T>;
    } catch (error) {
      const zodError = error as z.ZodError;
      const zodMessages = zodError.message;

      const message = CONFIG.debug ? zodMessages : errorMessage;
      throw new ClientError(message, ErrorCode.INVALID_INPUT);
    }
  }

  public static RequestBody<T extends z.ZodTypeAny>(req: Request, schema: T) {
    return this.validate(req.body, schema, 'Invalid request body.');
  }

  public static RequestParams<T extends z.ZodTypeAny>(req: Request, schema: T) {
    return this.validate(req.params, schema, 'Invalid request parameters.');
  }

  public static RequestQuery<T extends z.ZodTypeAny>(req: Request, schema: T) {
    return this.validate(req.query, schema, 'Invalid request query.');
  }
}
