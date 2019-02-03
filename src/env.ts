import * as dotenv from 'dotenv'

dotenv.config()

export enum Env {
  HOST = 'HOST',
  PORT = 'PORT',
  DB_NAME = 'DB_NAME',
  DB_HOST = 'DB_HOST',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_USERNAME = 'DB_USERNAME',
  NODE_ENV = 'NODE_ENV',
  JWT_ALGORITHM = 'JWT_ALGORITHM',
  JWT_SECRET = 'JWT_SECRET',
}

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export const nodeEnv = Object.values(NodeEnv).includes(process.env.NODE_ENV)
  ? (process.env.NODE_ENV as NodeEnv)
  : NodeEnv.DEVELOPMENT

export function env(name: Env, failIfNotSet: true): string
export function env(name: Env): string | null
export function env(name: Env, failIfNotSet: boolean = false): string | null {
  const val = process.env[name] as string | undefined
  if (failIfNotSet) {
    if (typeof val === 'string') {
      return val
    } else {
      throw new Error(`Env ${name} is not set!`)
    }
  } else {
    return typeof val === 'string' ? val : null
  }
}
