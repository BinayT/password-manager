import db from '@/db/knex';
import type { Knex } from 'knex';

export const getUpdatedTimeStamp = (): Knex.Raw => {
    return db.fn.now()
};