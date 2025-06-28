import { createApiError } from '@/errors/apiError';
import { hashPassword } from '@/utils/hash';
import db from '@/db/knex';

export const registerUser = async (email: string, password: string, username: string) => {
    const existingEmail = await db('users').where({ email }).first();
    const existingUsername = await db('users').where({ username }).first();
    if (existingEmail) {
        throw createApiError('Email already in use', 409);
    }

    if (existingUsername) {
        throw createApiError('Username already in use', 409);
    }
    const hashed = await hashPassword(password, 12);
    return db('users').insert({ email, password: hashed, username }).returning(['id', 'email', 'username']);
}
