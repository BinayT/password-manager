import db from '@/db/knex';
import { UpdateUserInput } from '@/types/User';
import { hashPassword } from '@/utils/hash';

export const updateUser = async (id: string, data: UpdateUserInput) => {
    if (Object.keys(data).length === 0) {
        const error = new Error('No fields provided for update') as Error & { statusCode: number };
        error.statusCode = 400;
        throw error;
    }

    const user = await db('users').where({ id }).first();
    if (!user) {
        const error = new Error('User not found') as Error & { statusCode: number };
        error.statusCode = 404;
        throw error;
    }
    
    if(data.username){
        const userName = await db('users').where({ username: data.username }).andWhereNot({ id }).first();
        if (userName) {
            const error = new Error('Username already exists') as Error & { statusCode: number };
            error.statusCode = 400;
            throw error;
        }
    }

    if(data.email){
        const userEmail = await db('users').where({ email: data.email }).andWhereNot({ id }).first();
        if (userEmail) {
            const error = new Error('Email already exists') as Error & { statusCode: number };
            error.statusCode = 400;
            throw error;
        }
    }

    if (data.password) {
        data.password = await hashPassword(data.password, 12);
    }

    const [updatedUser] = await db('users')
        .where({ id: id })
        .update(data)
        .returning(['id', 'email', 'username']);

    return updatedUser;

};
