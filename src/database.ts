import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'daily_diet',
    password: 'pg123',
  },
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
