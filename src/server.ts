import * as boom from 'boom'
import * as hapi from 'hapi'
import * as inert from 'inert'
import * as vision from 'vision'
import { APPLICATION_NAME } from './config'
import { IControllerAuthCredentials } from './controllers/util'
import { logger, errorLogger } from './logger'
import { env, Env } from './env'
import { parseJWTToken } from './services/jwtToken'

// prettier-ignore
type IValidateJWTContent =
  | { isValid: false }
  | { isValid: true; credentials: IControllerAuthCredentials }

const swaggerOptions = {
  documentationPage: true,
  documentationPath: '/docs',
  info: { title: APPLICATION_NAME },
  swaggerUI: true,
}

export const server = new hapi.Server({
  host: env(Env.HOST) || undefined,
  port: env(Env.PORT) || '3000',
  routes: { state: { parse: false } },
})

export async function registry() {
  const plugin = { plugin: require('hapi-swagger'), options: swaggerOptions } as any
  await server.register([inert, vision, plugin])
  await registerLogger()
  await registerJWTAuth()
}

async function registerLogger() {
  server.ext('onPreResponse', preResponse)
  server.events.on('response', request => {
    const method = request.method.toUpperCase()
    const response = request.response as hapi.ResponseObject
    const time = request.info.responded - request.info.received
    const remoteAddress = request.info.remoteAddress
    logger.info({ remoteAddress }, `${method} ${request.url.href} [${response.statusCode}] in ${time}ms`)
  })
}

async function registerJWTAuth() {
  await server.register(require('hapi-auth-jwt2'))
  server.auth.strategy('jwt', 'jwt', {
    key: env(Env.JWT_SECRET, true),
    validate: validateJWTContent,
    verifyOptions: { algorithms: [env(Env.JWT_ALGORITHM, true)] },
  })
  server.auth.default('jwt')
}

async function validateJWTContent(decoded: any): Promise<IValidateJWTContent> {
  const user = await parseJWTToken(decoded).catch(() => null)
  if (user) {
    return { isValid: true, credentials: { user } }
  } else {
    return { isValid: false }
  }
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
