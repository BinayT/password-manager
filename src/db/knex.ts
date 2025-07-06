import knex from 'knex';
import config from '../../knexfile';

type Env = 'development' | 'production' | 'test';
const env = (process.env.NODE_ENV || 'development') as Env;

export default knex(config[env]);