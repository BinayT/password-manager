import { Router } from 'express';
import { registerVaultController, updateVaultController } from './controller';
import { authenticate } from '@/middlewares/authenticate';
import { withAuth } from '@/utils/wrapAuthenticated';

const vaultRoutes = Router();

vaultRoutes
    .post('/', authenticate , withAuth((registerVaultController)))
    .patch('/:id', authenticate, withAuth((updateVaultController)));

export default vaultRoutes;
