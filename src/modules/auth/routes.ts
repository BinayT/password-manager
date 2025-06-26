import { Router } from 'express';
import { registerUserController, loginUserController } from './controller.ts';

const authRoutes = Router();

authRoutes.post('/register', registerUserController);
authRoutes.post('/login', loginUserController);

export default authRoutes;
