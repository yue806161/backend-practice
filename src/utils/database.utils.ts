export function manyData<T>(data: object|object[]): data is T[] {
  return Array.isArray(data) && data.length > 1;
}
