import * as assert from 'assert'
import { logger } from '../logger'

const pkg = require('../../package.json')

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME } = process.env

assert(typeof DB_NAME === 'string', 'Database name is not defined!')
assert(typeof DB_HOST === 'string', 'Database host is not defined!')
assert(typeof DB_PASSWORD === 'string', 'Database password is not defined!')
assert(typeof DB_USERNAME === 'string', 'Database username is not defined!')

const migrationStorageTableName = `sequelize-meta__${pkg.name}`
const seederStorageTableName = `sequelize-data__${pkg.name}`

const config = {
  development: {
    database: DB_NAME,
    dialect: 'mysql',
    host: DB_HOST,
    logging: (query: string) => logger.info(query),
    migrationStorageTableName,
    password: DB_PASSWORD,
    seederStorageTableName,
    username: DB_USERNAME,
  },
  production: {
    database: DB_NAME,
    dialect: 'mysql',
    host: DB_HOST,
    logging: false,
    migrationStorageTableName,
    password: DB_PASSWORD,
    seederStorageTableName,
    username: DB_USERNAME,
  },
  test: {
    database: DB_NAME,
    dialect: 'mysql',
    host: DB_HOST,
    logging: (query: string) => logger.info(query),
    migrationStorageTableName,
    password: DB_PASSWORD,
    seederStorageTableName,
    username: DB_USERNAME,
  },
}

export = config
