import * as hapi from 'hapi'
import * as boom from 'boom'
import { ITokenUserData } from 'src/services/jwtToken'
import { Omit } from 'src/services/types'

export type ControllerRouteRegistry<T extends object> = IControllerRoute<T> | Array<IControllerRoute<T>>

export interface IControllerAuthCredentials extends hapi.AuthCredentials {
  user?: ITokenUserData
}

export interface IControllerAuth extends hapi.RequestAuth {
  credentials: IControllerAuthCredentials
}

export interface IControllerRequest extends hapi.Request {
  auth: IControllerAuth
}

export interface IControllerRoute<T extends object> extends Omit<hapi.ServerRoute, 'handler'> {
  handler(request: IControllerRequest, h: IControllerToolkit<T>): Promise<hapi.ResponseObject | boom>
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
