import * as joi from 'joi'

export type IHealthzResponse = joi.extractType<typeof HealthzResponse>
export const HealthzResponse = joi
  .object({
    response: joi
      .string()
      .valid(['Ok', 'Fail'])
      .required(),
  })
  .label('HealthzResponse')
