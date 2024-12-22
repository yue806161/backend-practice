import { Filter, Document } from "mongodb";

export function isFilter<T extends Document>(query: unknown): query is Filter<T> {
  if (typeof query !== "object" || query === null) return false;

  return true;
}