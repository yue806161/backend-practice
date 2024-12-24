import { z } from 'zod';
import { DateTimeSchema, IDateTime } from '../utils/time';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  status: string;
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
  role: z.string(),
  status: z.string(),
  timestamps: z.object({
    created_at: DateTimeSchema,
    updated_at: DateTimeSchema,
  }),
});

export const GetUserListRequest = z.object({
  status: z.string(),
  page: z.number(),
  limit: z.number(),
  sort: z.string(),
});
export const GetUserRequest = z.object({
  id: z.string(),
});

export const CreateUserRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, 'password must be at least 8 characters'),
  role: z.string(),
  status: z.string(),
});
