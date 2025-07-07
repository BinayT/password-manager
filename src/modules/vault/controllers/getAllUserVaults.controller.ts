import type { NextFunction,  Response } from 'express';
import { AuthenticatedRequest } from '@/types/express-auth';
import { getAllUserVaults } from '../service';

export const getAllUserVaultsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.id;
    
    try {
      const user_vaults = await getAllUserVaults({userId});
      res.status(200).json({user_vaults});
    } catch (error) {
      next(error);
    }
};