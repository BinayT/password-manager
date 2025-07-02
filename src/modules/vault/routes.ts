import { Router } from 'express';
import { registerVaultController, updateVaultController, getVaultByIdController, deleteVaultByIdController } from './controller';
import { authenticate } from '@/middlewares/authenticate';
import { withAuth } from '@/utils/wrapAuthenticated';

const vaultRoutes = Router();

vaultRoutes
    .post('/', authenticate , withAuth((registerVaultController)))
    .patch('/:id', authenticate, withAuth((updateVaultController)))
    .get('/:id', authenticate, withAuth((getVaultByIdController)))
    .delete('/:id', authenticate, withAuth((deleteVaultByIdController)));

export default vaultRoutes;
