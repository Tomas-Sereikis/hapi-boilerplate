import * as joi from 'joi'

export type INotFoundResponse = joi.extractType<typeof NotFoundResponse>
export const NotFoundResponse = joi
  .object({
    code: joi
      .string()
      .valid(['not_found'])
      .required(),
  })
  .label('NotFoundResponse')
