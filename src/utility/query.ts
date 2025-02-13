export const extractQueryParams = (query?: string) => {
  if (!query) return null;

  const params = new URLSearchParams(query);
  const obj = {};

  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }

  return obj;
};
