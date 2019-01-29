import * as hapi from 'hapi'
import { ControllerRouteRegistry } from './util'
import { controllerHealthz } from './healthz'
import { controllerNotFound } from './notFound'
import { controllerUserSpace } from './userSpace'

export async function registerControllers(server: hapi.Server) {
  await register(server, controllerNotFound())
  await register(server, controllerHealthz())
  await register(server, controllerUserSpace())
}

async function register(server: hapi.Server, controllers: ControllerRouteRegistry<any>) {
  await server.route(controllers as hapi.ServerRoute)
}
