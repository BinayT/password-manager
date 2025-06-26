import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from 'express-auth'; // update the path as needed

import { getUserById } from '../service';

export const getMeController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await getUserById(userId);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
