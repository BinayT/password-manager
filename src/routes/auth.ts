import { Router } from 'express';
import { registerUser } from '../controllers/authController.ts';
import { loginUser } from '../controllers/loginUser.ts';

const router = Router();

router.post('/me', loginUser);
router.post('/register', registerUser);

export default router;
