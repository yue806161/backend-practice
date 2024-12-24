import { z } from 'zod';

// This file contains a function to get the current date and time in the specified locale and options.
const default_options = {
  weekday: 'long',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

export function getDateTime(locale: Intl.LocalesArgument, options: object = default_options): string {
  const date = new Date();

  return date.toLocaleDateString(locale, options);
}

export interface IDateTime {
  date: Date;
  time: number;
}

export const DateTimeSchema = z.object({
  date: z.date(),
  time: z.number().int(),
});
