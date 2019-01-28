import * as Sequelize from 'sequelize'
import * as config from '../config'
import { nodeEnv } from '../../env'

export const sequelize = new Sequelize(config[nodeEnv])

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
