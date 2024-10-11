export const validateParams = (obj: Object, requiredParams: string[]): string | null => {
  for (const param of requiredParams) {
    if (!obj.hasOwnProperty(param)) return param;
  }
  return null;
};

export const validateQueryParams = (query: any, requiredParams: string[]): string | null => {
  for (const param of requiredParams) {
    if (!query.hasOwnProperty(param)) return param;
  }
  return null;
};
