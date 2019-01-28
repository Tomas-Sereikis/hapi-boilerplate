import * as hapi from 'hapi'

export type ControllerRouteRegistry<T extends object> =
  | ControllerRoute<T>
  | Array<ControllerRoute<T>>

export interface ControllerRoute<T extends object> extends hapi.ServerRoute {
  handler(request: hapi.Request, h: ControllerToolkit<T>): Promise<hapi.ResponseObject>
}

export interface ControllerToolkit<T extends object> extends hapi.ResponseToolkit {
  response(value?: T): hapi.ResponseObject
}

export enum HTTP_METHODS {
  DELETE = 'DELETE',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  OPTIONS = 'OPTIONS',
}
