import type { ZodError } from 'zod';

export function zodValidationError(error: ZodError) {
  const flattened = error.flatten();

  const err = new Error('Validation failed') as Error & {
    statusCode: number;
    type: string;
    errors: any;
  };

  err.statusCode = 400;
  err.type = 'ZOD_VALIDATION_ERROR';
  err.errors = {
    fieldErrors: flattened.fieldErrors,
    formErrors: flattened.formErrors,
  };

  return err;
}
