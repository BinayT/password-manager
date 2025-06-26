import db from '@db/knex';

export const getUserById = async (id: string) => {
  const user = await db('users').where({ id }).first();

  if (!user) {
    const error = new Error('User not found') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  delete user.password;
  return user;
};
