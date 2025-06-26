import type { NextFunction, Request, Response } from 'express';

import { loginUser } from '../service';
import { zodValidationError } from '@errors/zodValidationError';
import { loginSchema } from '../schema';

export const loginUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
  const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      throw zodValidationError(result.error);
    }

  const { email, password } = result.data;

  try {
    const data = await loginUser(email, password);
    
    res.status(200).json({
      message: 'Login Successful',
      ...data,
    });
  } catch (err) {
    next(err);
  }
};