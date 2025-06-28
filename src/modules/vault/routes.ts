import { Router } from 'express';
import { registerVaultController } from './controller';
import { authenticate } from '@/middlewares/authenticate';
import { withAuth } from '@/utils/wrapAuthenticated';

const vaultRoutes = Router();

vaultRoutes.post('/register', authenticate , withAuth((registerVaultController))); 

export default vaultRoutes;
