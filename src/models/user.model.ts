import { z } from 'zod';
import { DateTimeSchema, IDateTime } from '../utils/time';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  status: 'active' | 'revoke';
  timestamps: {
    created_at?: IDateTime;
    updated_at: IDateTime;
  };
}

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  status: z.string(),
  timestamps: z.object({
    created_at: DateTimeSchema,
    updated_at: DateTimeSchema,
  }),
});

export const GetUsersRequestParams = z.object({ id: z.string() });
export const GetUsersRequestQuery = z.object({
  status: z.enum(['active', 'revoke']).default('active'),
  page: z.number().default(1),
  limit: z.number().default(10),
  sort: z.string().default('asc'),
});

export const CreateUserRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, 'password must be at least 8 characters'),
  status: z.enum(['active', 'revoke']).default('active'),
});
