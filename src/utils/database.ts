export function manyData(data: any): boolean {
  return Array.isArray(data) && data.length > 1;
}
