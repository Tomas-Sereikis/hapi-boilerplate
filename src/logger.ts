import * as pino from 'pino'

const prettyPrintDevelopment = { translateTime: true, colorize: false }
const prettyPrint = process.env.NODE_ENV !== 'development' ? prettyPrintDevelopment : false

export const logger = pino({ prettyPrint })
export const errorLogger = pino({ prettyPrint }, process.stderr)
