import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/knex.ts';
import { registerSchema } from '../validators/registerSchema.ts';
import { zodValidationError } from '../errors/zodValidationError.ts';
import { createApiError } from '../errors/ApiError.ts';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    throw zodValidationError(result.error);
  }

  const { email, password, username } = req.body;

  try {
    const existing = await db('users').where({ email }).first();
    if (existing) {
        throw createApiError('Email already in use', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [user] = await db('users')
      .insert({ email, password: hashedPassword, username })
      .returning(['id', 'email', 'username']);

    res.status(201).json({
      message: 'User created',
      user,
    });
  } catch (err) {
    next(err);
  }
};