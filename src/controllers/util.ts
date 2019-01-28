import * as hapi from 'hapi'
import * as boom from 'boom'

export type ControllerRouteRegistry<T extends object> =
  | IControllerRoute<T>
  | Array<IControllerRoute<T>>

export interface IControllerRoute<T extends object> extends hapi.ServerRoute {
  handler(request: hapi.Request, h: IControllerToolkit<T>): Promise<hapi.ResponseObject | boom>
}

export interface IControllerToolkit<T extends object> extends hapi.ResponseToolkit {
  response(value?: T): hapi.ResponseObject
}

export enum HTTP_METHODS {
  DELETE = 'DELETE',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  OPTIONS = 'OPTIONS',
}
