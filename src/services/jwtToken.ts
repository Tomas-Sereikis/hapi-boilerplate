import * as jsonwebtoken from 'jsonwebtoken'
import * as joi from 'joi'
import { env, Env } from '../env'

export type ITokenUserData = joi.extractType<typeof TokenUserData>
export const TokenUserData = joi
  .object({
    datetime: joi
      .date()
      .iso()
      .required(),
    id: joi.string().required(),
  })
  .label('TokenUserData')

export async function generateJWTToken(userData: ITokenUserData): Promise<string> {
  const algorithm = env(Env.JWT_ALGORITHM, true)
  const validated = await joi.validate(userData, TokenUserData, { stripUnknown: true })
  return jsonwebtoken.sign(validated, env(Env.JWT_SECRET, true), { algorithm })
}

export async function parseJWTToken(decoded: any): Promise<ITokenUserData> {
  return (await joi.validate(decoded, TokenUserData, { stripUnknown: true })) as ITokenUserData
}
