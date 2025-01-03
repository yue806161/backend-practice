import { z } from 'zod';
import { CONST } from '../../../config';
import { DateTimeSchema, IDateTime } from '../../../models/time';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: string | object;
}
export interface IAuth {
  user_id: string;
  email: string;
  device_info: string;
  ip_address: string;
  refresh_token_hash: string;
  password_hash: string;
  expired_at: IDateTime;
  status: 'active' | 'revoked';
  created_at: IDateTime;
  updated_at: IDateTime;
}

export const AuthSchema = z.object({
  user_id: z.string(),
  email: z.string().email(),
  device_info: z.string().optional(),
  ip_address: z.string().regex(CONST.ip_regex, 'Invalid IP address format'),
  password_hash: z.string(),
  refresh_token_hash: z.string(),
  expired_at: DateTimeSchema,
  status: z.enum(['active', 'revoked']),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const SignInSchema = z.object({
  user_id: z.string(),
  email: z.string().email(),
  password_hash: z.string().min(8),
  device_info: z.string().optional(),
  ip_address: z.string().regex(CONST.ip_regex, 'Invalid IP address format'),
  refresh_token_hash: z.string(),
});
