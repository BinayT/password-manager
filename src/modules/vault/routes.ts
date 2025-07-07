import { Router } from 'express';
import { registerVaultController, updateVaultController, getVaultByIdController, deleteVaultByIdController, getAllUserVaultsController } from './controller';
import { authenticate } from '@/middlewares/authenticate';
import { withAuth } from '@/utils/wrapAuthenticated';

const vaultRoutes = Router();

vaultRoutes
    .get('/', authenticate, withAuth((getAllUserVaultsController)))
    .get('/:id', authenticate, withAuth((getVaultByIdController)))
    .patch('/:id', authenticate, withAuth((updateVaultController)))
    .post('/', authenticate , withAuth((registerVaultController)))
    .delete('/:id', authenticate, withAuth((deleteVaultByIdController)));

export default vaultRoutes;
