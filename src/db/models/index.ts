import * as Sequelize from 'sequelize'
import * as config from '../config'

type IEnv = keyof typeof config

const { NODE_ENV } = process.env
const envList = Object.keys(config)
const env: IEnv = NODE_ENV && envList.indexOf(NODE_ENV) !== -1 ? (NODE_ENV as IEnv) : 'development'

export const sequelize = new Sequelize(Object.assign(config[env], {}))

const db = {
  sequelize,
}

Object.values<any>(db).forEach(model => {
  if (model.associate) {
    model.associate(db)
  }
})

// due to of sequalize cli
module.exports = db
