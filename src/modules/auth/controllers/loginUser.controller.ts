import type { NextFunction, Request, Response } from 'express';

import { loginUser } from '../service.ts';
import { zodValidationError } from '@errors/zodValidationError.ts';
import { loginSchema } from '../schema.ts';

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
    
  const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      throw zodValidationError(result.error);
    }

  const { email, password } = req.body;

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