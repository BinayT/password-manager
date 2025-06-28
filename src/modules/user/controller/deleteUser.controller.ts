import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from 'express-auth';

import { deleteUser } from '../service';

export const deleteUserController = async ( req: AuthenticatedRequest, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully', user: user });
  } catch (err) {
    next(err);
  }
};
