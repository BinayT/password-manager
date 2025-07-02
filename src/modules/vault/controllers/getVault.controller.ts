import type { NextFunction,  Response } from 'express';
import { AuthenticatedRequest } from '@/types/express-auth';
import { checkVaultOwnership } from '../service';

export const getVaultByIdController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.id;
    const vaultId = req.params?.id;
    
    try {
      const vault = await checkVaultOwnership({vaultId, userId});
      res.status(200).json({vault});
    } catch (error) {
      next(error);
    }
};