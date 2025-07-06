import type { NextFunction, Request, Response } from 'express';

import { zodValidationError } from '@/errors/zodValidationError';
import { registerUser } from '../service';
import { registerSchema } from '../schema';

export const registerUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = registerSchema.safeParse(req.body);
    
    if (!result.success) {
      throw zodValidationError(result.error);
    }
    
    const { email, password, username } = result.data;
    console.log('heyyy ---');
    
    const [user] = await registerUser(email, password, username);
    res.status(201).json({
      message: 'User created',
      user,
    });

  } catch (err) {
    next(err);
  }
};