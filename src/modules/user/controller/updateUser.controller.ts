import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from 'express-auth';

import { updateUser } from '../service/updateUser';
import { userSchema } from '../schema/userSchema';
import { zodValidationError } from '@/errors/zodValidationError';

export const updateUserController = async (
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

    const result = userSchema.safeParse(req.body);

    if(!result.success) {
        throw zodValidationError(result.error);
    }
    
    const user = await updateUser(userId, result.data);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
