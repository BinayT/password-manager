import type { NextFunction,  Response } from 'express';
import { AuthenticatedRequest } from '@/types/express-auth';
import { getVault } from '../service';

export const getVaultByIdController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.id;
    const vaultId = req.params?.id;
    
    try {
      const data = await getVault(userId, vaultId);
      res.status(200).json({data});
    } catch (error) {
      next(error);
    }
};