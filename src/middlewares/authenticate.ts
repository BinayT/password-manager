import type { NextFunction, Request, Response, RequestHandler } from 'express';
import { verifyJWT } from '@/utils/signJwt';

export const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({
      message: 'No token provided',
    });
    return;
  }

  try {
    const decoded = verifyJWT(token);
    if (!decoded) {
      res.status(401).json({
        message: 'Invalid token',
      });
      return;
    }

    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token',
    });
  }
};