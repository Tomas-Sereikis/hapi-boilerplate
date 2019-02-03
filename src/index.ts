import { server, registry } from './server'
import { registerControllers } from './controllers'
import { errorLogger, logger } from './logger'

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

async function onFailed(err: Error) {
  errorLogger.error(err)
  process.exit(1)
}

main().catch(onFailed)
