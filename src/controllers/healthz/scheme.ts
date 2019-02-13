import * as joi from 'joi'

export type IHealthzResponse = joi.extractType<typeof HealthzResponse>
export const HealthzResponse = joi
  .string()
  .label('HealthzResponse')
  .valid(['Ok'])
  .required()
