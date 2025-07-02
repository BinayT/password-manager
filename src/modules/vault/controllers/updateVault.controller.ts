import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from 'express-auth';

import { updateVault } from '../service';
import { vaultSchema } from '../schema';
import { zodValidationError } from '@/errors/zodValidationError';
import { checkVaultOwnership } from '../service/checkVaultOwnership';

export const updateVaultController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const vaultId = req.params?.id;
    
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    
    const result = vaultSchema.safeParse({...req.body, id: vaultId});

    if(!result.success) {
        throw zodValidationError(result.error);
    }

    const vault = await checkVaultOwnership({vaultId, userId});

    const requestedVault = await updateVault(vault?.id , result.data);
    res.status(200).json({ requestedVault });
  } catch (err) {
    next(err);
  }
};
