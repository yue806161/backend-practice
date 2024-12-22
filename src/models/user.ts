import { z } from 'zod';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  timestamps: {
    created_at?: number;
    updated_at: number;
  };
}

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.string(),
  status: z.string(),
  timestamps: z.object({
    created_at: z.number(),
    updated_at: z.number(),
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
  password: z.string().min(8),
  role: z.string(),
  status: z.string(),
});
