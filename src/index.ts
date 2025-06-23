import express from 'express';

import authRoutes from './routes/auth.ts';

import { errorHandler } from './middlewares/errorHandler.ts';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
