import type { ErrorRequestHandler } from 'express';

import { logger } from '@/utils/logger';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.error('Unhandled error caught by errorHandler', {
    path: req.path,
    method: req.method,
    error: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
  });

  if (err?.type === 'ZOD_VALIDATION_ERROR') {
    res.status(400).json({
      error: err.message,
      details: err.errors,
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
  return;
};

