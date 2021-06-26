import { Sequelize } from 'sequelize'

const config = require(__dirname + '/../config/config.js')

const sequelize = new Sequelize(config)

export {Sequelize, sequelize}
