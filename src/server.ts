import * as boom from 'boom'
import * as hapi from 'hapi'
import * as inert from 'inert'
import * as vision from 'vision'
import { logger, errorLogger } from './logger'

const pkg = require('../package.json')
const swaggerOptions = {
  info: { title: pkg.description },
}

const { HOST, PORT } = process.env

export const server = new hapi.Server({
  host: HOST || 'localhost',
  port: PORT || 3000,
  routes: {
    state: { parse: false },
  },
})

export async function registry() {
  const plugin = { plugin: require('hapi-swagger'), options: swaggerOptions } as any
  await server.register([inert, vision, plugin])
  await registerLogger()
}

async function registerLogger() {
  server.ext('onPreResponse', preResponse)
  server.events.on('response', request => {
    const method = request.method.toUpperCase()
    const response = request.response as hapi.ResponseObject
    const time = request.info.responded - request.info.received
    const remoteAddress = request.info.remoteAddress
    logger.info(
      { remoteAddress },
      `${method} [${response.statusCode}] ${request.url.href} in ${time}ms`,
    )
  })
}

function preResponse(request: hapi.Request, h: hapi.ResponseToolkit) {
  const response = request.response
  if (boom.isBoom(response as boom)) {
    const err = response as boom
    const msg = err.output.payload.error.replace(/[ ]+/g, '_').toLowerCase()
    const res = h.response({ error: msg })
    res.code(err.output.statusCode)
    errorLogger.error(err.stack ? err.stack : err.toString())
    return res
  }
  return h.continue
}
