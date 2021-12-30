import { Sequelize } from 'sequelize';

import config from './../config/config.js';

const sequelize = new Sequelize(config);

export {Sequelize, sequelize};
