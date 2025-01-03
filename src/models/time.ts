import { z } from 'zod';

export interface IDateTime {
  date: Date;
  time: number;
}
export const DateTimeSchema = z.object({
  date: z.date(),
  time: z.number().int(),
});
