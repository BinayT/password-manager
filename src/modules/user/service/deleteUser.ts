import db from '@/db/knex';

export const deleteUser = async (id: string) => {

    const deletedUser = await db('users').where({ id }).first();

    if (!deletedUser || deletedUser.length === 0) {
        const error = new Error('User not found') as Error & { statusCode: number };
        error.statusCode = 404;
        throw error;
    }


    await db('users').where({ id }).delete();
    console.info(`User with id ${id} deleted`);

    return deletedUser;

};
