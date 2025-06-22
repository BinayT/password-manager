import type { ZodError } from 'zod';

export function zodValidationError( error: ZodError ) {
  const flattened = error.flatten();

  return {
    type: 'ZOD_VALIDATION_ERROR',
    statusCode: 400,
    message: 'Validation failed',
    errors: {
      fieldErrors: flattened.fieldErrors,
      formErrors: flattened.formErrors,
    },
  };
}
