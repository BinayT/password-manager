import { Router } from 'express';
import { registerUserController, loginUserController } from './controller';

const authRoutes = Router();

authRoutes
    .post('/register', registerUserController)
    .post('/login', loginUserController);


export default authRoutes;
