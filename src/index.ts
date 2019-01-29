import * as dotenv from 'dotenv'
import { server, registry } from './server'
import { registerControllers } from './controllers'
import { errorLogger, logger } from './logger'

dotenv.config()
main().catch(onFail)

process.on('uncaughtException', (error: Error) => {
  errorLogger.error(`UncaughtException ${error.stack}`)
})

process.on('unhandledRejection', (reason: any) => {
  errorLogger.error(`UnhandledRejection ${reason}`)
})

async function main() {
  await registry()
  await server.start()
  await registerControllers(server)
  logger.info(`Server running at: ${server.info.uri}`)
}

async function onFail(err: Error) {
  errorLogger.error(err)
  process.exit(1)
}
