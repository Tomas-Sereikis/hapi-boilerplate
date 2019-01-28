import { ControllerRouteRegistry, HTTP_METHODS } from '../util'
import { INotFoundResponse, NotFoundResponse } from './scheme'

export function controllerNotFound(): ControllerRouteRegistry<INotFoundResponse> {
  return {
    method: Object.values(HTTP_METHODS),
    path: '/{any*}',
    options: {
      description: 'Not found route',
      response: {
        status: {
          404: NotFoundResponse,
        },
      },
      tags: [],
      validate: {},
    },
    handler: async (request, h) => {
      const response = h.response({ code: 'not_found' })
      response.code(404)
      return response
    },
  }
}
