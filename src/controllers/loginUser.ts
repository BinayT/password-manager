import type { NextFunction, Request, Response } from 'express';
import db from '../db/knex.ts';
import { loginSchema } from '../validators/loginSchema.ts';
import { zodValidationError } from '../errors/zodValidationError.ts';
import { createApiError } from '../errors/apiError.ts';
import { comparePassword } from '../utils/hash.ts';
import { generateToken } from '../utils/signJwt.ts';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw zodValidationError(result.error);
  }

  const { email, password } = req.body;

  try {
    const userExists = await db('users').where({ email }).first();
    
    if (!userExists) {
        throw createApiError('Email not registered yet.', 404);
    }

    const userHashedPassword = userExists?.password;
    const isPasswordCorrrect =  await comparePassword(password, userHashedPassword);
    console.log(isPasswordCorrrect);
    
    if(!isPasswordCorrrect){
        throw createApiError('Email or Password incorrect.', 401);
    }

    const token = generateToken({userId: userExists.id});
    
    res.status(201).json({
      message: 'User Logged In successfully',
      token,
      data: userExists,
    });

  } catch (err) {
    next(err);
  }
};