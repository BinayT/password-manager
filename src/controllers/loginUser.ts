import type { NextFunction, Request, Response } from 'express';
import db from '../db/knex.ts';
import { loginSchema } from '../validators/loginSchema.ts';
import { zodValidationError } from '../errors/zodValidationError.ts';
import { createApiError } from '../errors/apiError.ts';
import { comparePassword } from '../utils/hash.ts';
import { signJwt } from '../utils/signJwt.ts';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw zodValidationError(result.error);
  }

  const { email, password } = req.body;

  try {
    const userExists = await db('users').where({ email }).first();
    
    if (!userExists) {
        throw createApiError('Invalid credentials.', 401);
    }

    const userHashedPassword = userExists?.password;
    const isPasswordCorrrect =  await comparePassword(password, userHashedPassword);
    
    if(!isPasswordCorrrect){
        throw createApiError('Invalid credentials.', 401);
    }

    const token = signJwt({userId: userExists.id});
    
    res.status(201).json({
      message: 'User Logged In successfully',
      token,
      user: {
        id: userExists.id,
        email: userExists.email,
        username: userExists.username || null,
      },
    });

  } catch (err) {
    next(err);
  }
};