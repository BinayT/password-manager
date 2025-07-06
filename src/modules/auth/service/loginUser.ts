import { createApiError } from '@/errors/apiError';

import db from '@/db/knex';

import { comparePassword } from '@/utils/hash';
import { signJwt } from '@/utils/signJwt';
import { logger } from '@/utils/logger';

export const loginUser = async (email: string, password: string) => {
    const user = await db('users').where({ email }).first();
    
    if (!user) {
        throw createApiError('Invalid credentials.', 401);
    }

    const userHashedPassword = user?.password;
    const isPasswordCorrrect =  await comparePassword(password, userHashedPassword);
    
    if(!isPasswordCorrrect){
        throw createApiError('Invalid credentials.', 401);
    }

    const {password: userPassword, ...userWithoutPassword} = user;
    const token = signJwt(userWithoutPassword);

    logger.info(`User logged in with email: ${email} and username: ${user.username}`);

    return {
        token,
        user: {
        id: user.id,
        email: user.email,
        username: user.username || null,
      }
    }
};