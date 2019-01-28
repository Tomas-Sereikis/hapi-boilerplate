import * as colors from 'colors'
import * as hapi from 'hapi'
import * as inert from 'inert'
import * as vision from 'vision'
import { logger } from './logger'

const pkg = require('../package.json')
const swaggerOptions = {
  info: { title: pkg.description },
}

const { HOST, PORT } = process.env

export const server = new hapi.Server({
  host: HOST || 'localhost',
  port: PORT || 3000,
})

export async function registry() {
  const plugin = { plugin: require('hapi-swagger'), options: swaggerOptions } as any
  await server.register([inert, vision, plugin])
  await registerLogger()
}

async function registerLogger() {
  server.events.on('response', request => {
    const method = request.method.toUpperCase().padStart(6)
    const response = request.response as hapi.ResponseObject
    const timeDiff = request.info.responded - request.info.received
    const time = (timeDiff / 1000).toFixed(3)
    const statusCode = status(response.statusCode)
    const remoteAddress = request.info.remoteAddress.padStart(15)
    logger.info(`${remoteAddress} ${method} [${statusCode}] ${request.url.href} in ${time}s`)
  })
}

function status(statusCode: number): string {
  if (statusCode >= 200 && statusCode < 300) {
    return colors.green(statusCode.toString())
  } else if (statusCode >= 300 && statusCode < 400) {
    return colors.yellow(statusCode.toString())
  } else if (statusCode >= 400) {
    return colors.red(statusCode.toString())
  } else {
    return statusCode.toString()
  }
}
