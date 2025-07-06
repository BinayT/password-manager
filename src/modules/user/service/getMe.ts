import db from '@/db/knex';
import { logger } from '@/utils/logger';

export const getUserById = async (id: string) => {
  const user = await db('users').where({ id }).first();

  if (!user) {
    const error = new Error('User not found') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  delete user.password;

  logger.info(`User data retrieved for user. Info: `, user);
  
  return user;
};
