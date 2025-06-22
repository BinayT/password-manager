export function createApiError(message: string, statusCode = 500) {
  const error = new Error(message) as Error & { statusCode: number; type: string };
  error.statusCode = statusCode;
  return error;
}
