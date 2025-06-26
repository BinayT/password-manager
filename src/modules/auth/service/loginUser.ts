import { createApiError } from '@errors/apiError.ts';

import db from '@db/knex.ts';

import { comparePassword } from '@utils/hash.ts';
import { signJwt } from '@utils/signJwt.ts';

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

    return {
        token,
        user: {
        id: user.id,
        email: user.email,
        username: user.username || null,
      }
    }
};