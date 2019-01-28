import * as pino from 'pino'
import { nodeEnv, NodeEnv } from './env'

const prettyPrintDevelopment = { translateTime: true }
const prettyPrint = nodeEnv === NodeEnv.DEVELOPMENT ? prettyPrintDevelopment : false

export const logger = pino({ prettyPrint })
export const errorLogger = pino({ prettyPrint }, process.stderr)
