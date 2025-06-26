import type { NextFunction, Request, Response } from 'express';

import { zodValidationError } from '@errors/zodValidationError.ts';
import { registerUser } from '../service.ts';
import { registerSchema } from '../schema.ts';

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    throw zodValidationError(result.error);
  }

  const { email, password, username } = req.body;

  try {
    const [user] = await registerUser(email, password, username);
    res.status(201).json({
      message: 'User created',
      user,
    });
  } catch (err) {
    next(err);
  }
};