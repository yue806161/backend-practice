import { z } from 'zod';
import { Database } from './abstract';
import { DatabaseType } from './factory';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  active?: boolean;
  timestamps?: {
    created_at?: number;
    updated_at?: number;
  };
}

export class UserTable extends Database<IUser> {
  private static schema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.string(),
    active: z.boolean().optional(),
    timestamps: z.object({
      created_at: z.number().optional(),
      updated_at: z.number().optional(),
    }).optional(),
  });

  constructor(databaseType: DatabaseType) {
    super(databaseType, 'users', UserTable.schema);
  }
}
