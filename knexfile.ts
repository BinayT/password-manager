import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    migrations: {
      extension: 'ts',
      directory: './src/db/migrations',
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      extension: 'ts',
      directory: './src/db/migrations',
    },
  }
};

export default config;