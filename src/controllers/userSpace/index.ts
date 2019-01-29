import { ControllerRouteRegistry, HTTP_METHODS } from '../util'
import { IUserSpaceResponse, UserSpaceResponse } from './scheme'

export function controllerUserSpace(): ControllerRouteRegistry<IUserSpaceResponse> {
  return {
    method: HTTP_METHODS.GET,
    path: '/userspace',
    options: {
      description: 'Base user from auth data',
      notes: 'Request basic user data, user data will be returned by auth user id!',
      response: {
        schema: UserSpaceResponse,
      },
      tags: ['api'],
      validate: {},
    },
    handler: async (request, h) => {
      return h.response({ username: `username_${request.auth.credentials.user!.id}` })
    },
  }
}
