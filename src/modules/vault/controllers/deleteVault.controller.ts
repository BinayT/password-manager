import type { NextFunction,  Response } from 'express';
import { AuthenticatedRequest } from '@/types/express-auth';
import { checkVaultOwnership } from '../service';
import { deleteVaultById } from '../service';

export const deleteVaultByIdController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.id;
    const vaultId = req.params?.id;
    
    try {
      await checkVaultOwnership({vaultId, userId});
      const deletedVault = await deleteVaultById({vaultId});

      res.status(200).json({msg: 'Vault deleted successfully', deletedVault});
    } catch (error) {
      next(error);
    }
};