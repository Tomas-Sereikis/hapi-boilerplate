import * as sequelize from 'sequelize'
import { logger } from '../logger'
import { env, Env, NodeEnv } from 'src/env'

const pkg = require('../../package.json')

interface ISequelizeOptions extends sequelize.Options {
  migrationStorageTableName?: string
  seederStorageTableName?: string
}

const config = {
  development: buildConfigFor(NodeEnv.DEVELOPMENT),
  production: buildConfigFor(NodeEnv.PRODUCTION),
  test: buildConfigFor(NodeEnv.TEST),
}

function buildConfigFor(environment: NodeEnv): ISequelizeOptions {
  return {
    database: env(Env.DB_NAME, true),
    dialect: 'mysql',
    host: env(Env.DB_HOST, true),
    logging: environment !== NodeEnv.PRODUCTION ? (query: string) => logger.info(query) : false,
    migrationStorageTableName: `sequelize-meta__${pkg.name}`,
    password: env(Env.DB_PASSWORD, true),
    seederStorageTableName: `sequelize-data__${pkg.name}`,
    username: env(Env.DB_USERNAME, true),
  }
}

export = config
