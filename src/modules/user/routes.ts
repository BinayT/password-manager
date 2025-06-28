import { Router } from 'express';
import { getMeController, updateUserController } from './controller';
import { authenticate } from '@/middlewares/authenticate';
import { withAuth } from '@/utils/wrapAuthenticated';

const userRoutes = Router();


userRoutes
    .get('/me', authenticate, withAuth(getMeController))
    .patch('/me', authenticate, withAuth(updateUserController));

export default userRoutes;
