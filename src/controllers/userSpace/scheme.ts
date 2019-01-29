import * as joi from 'joi'

export type IUserSpaceResponse = joi.extractType<typeof UserSpaceResponse>
export const UserSpaceResponse = joi
  .object({
    username: joi.string().required(),
  })
  .label('IUserSpaceResponse')
