import type { NextFunction,  Response } from 'express';
import { AuthenticatedRequest } from '@/types/express-auth';

import { zodValidationError } from '@/errors/zodValidationError';
import { vaultSchema } from '../schema/vaultSchema';
import { registerVault } from '../service';

export const registerVaultController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user?.id;

  const result = vaultSchema.safeParse({...req.body});
    if (!result.success) {
      throw zodValidationError(result.error);
    }
    const safeParsedData = {...result.data, user_id: userId};
    console.log(safeParsedData);
    
    try {
      const data = await registerVault(safeParsedData);

      res.status(200).json({message: 'Password entry succesfully created !', data});
    } catch (error) {
      next(error);
    }
};