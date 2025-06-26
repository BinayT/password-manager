import { Router } from 'express';
import { getMeController } from './controller';
import { authenticate } from '@middlewares/authenticate';
import { withAuth } from '@utils/wrapAuthenticated';

const userRoutes = Router();


userRoutes.get('/me', authenticate, withAuth(getMeController));

export default userRoutes;
