import express from 'express';
import { errorHandler } from '@middlewares/errorHandler';
import authRoutes from '@modules/auth/routes';
import userRoutes from '@modules/user/routes';


const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

export default app;
