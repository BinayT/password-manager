import type { Response, NextFunction, RequestHandler } from 'express';
import type { AuthenticatedRequest } from 'express-auth';

const withAuth = (handler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void> ): RequestHandler => {
  return (req, res, next) => handler(req as AuthenticatedRequest, res, next);
};

export { withAuth }
