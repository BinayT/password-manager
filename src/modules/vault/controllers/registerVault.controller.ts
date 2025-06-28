import type { NextFunction, Request, Response } from 'express';

import { zodValidationError } from '@/errors/zodValidationError';
import { vaultSchema } from '../schema/vaultSchema';
import { registerVault } from '../service';

export const registerVaultController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = (req as any).user?.id;

  const result = vaultSchema.safeParse({...req.body, user_id: userId});
    if (!result.success) {
      throw zodValidationError(result.error);
    }
    const safeParsedData = result.data;

    try {
      const data = await registerVault(safeParsedData);

      res.status(200).json({message: 'Password entry succesfully created !', data});
    } catch (error) {
      next(error);
    }
};