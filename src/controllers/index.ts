import * as hapi from 'hapi'
import { controllerHealthz } from './healthz'
import { controllerNotFound } from './notFound'

export async function registerControllers(server: hapi.Server) {
  await server.route(controllerNotFound())
  await server.route(controllerHealthz())
}
