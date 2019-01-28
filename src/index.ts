import * as dotenv from 'dotenv'
import { server, registry } from './server'
import { registerControllers } from './controllers'
import { logger } from './logger'

dotenv.config()
main().catch(onFail)

async function main() {
  await registry()
  await server.start()
  await registerControllers(server)
  logger.info(`Server running at: ${server.info.uri}`)
}

async function onFail(err: Error) {
  logger.error(err)
  process.exit(1)
}
