import { z } from 'zod';

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  position: number;
  status: string;
  timestamps: {
    created_at?: number,
    updated_at: number,
  },
}

export const EmployeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  position: z.number(),
  status: z.string(),
  timestamps: z.object({
    created_at: z.number(),
    updated_at: z.number(),
  }),
});


