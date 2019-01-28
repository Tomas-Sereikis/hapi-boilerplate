import { ControllerRouteRegistry, HTTP_METHODS } from '../util'
import { HealthzResponse, IHealthzResponse } from './scheme'

export function controllerHealthz(): ControllerRouteRegistry<IHealthzResponse> {
  return {
    method: HTTP_METHODS.GET,
    path: '/healthz',
    options: {
      description: 'Health check endpoint',
      notes: 'Use this endpoint to check status of the service, returns Ok if http is bind.',
      response: {
        schema: HealthzResponse,
      },
      tags: ['api'],
      validate: {},
    },
    handler: async (request, h) => {
      return h.response({ response: 'Ok' })
    },
  }
}
