import type { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '@utils/signJwt';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }

  try {
    const decoded = verifyJWT(token);
    if (!decoded) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};