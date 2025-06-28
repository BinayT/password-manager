export function createApiError(message: string, statusCode = 500) {
  const error = new Error(message);
  (error as any).statusCode = statusCode;
  (error as any).type = 'API_ERROR';
  return error;
}
