import express from 'express';
import { errorHandler } from '../middlewares/errorHandler.ts';
import authRoutes from '../modules/auth/routes.ts';


const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;
