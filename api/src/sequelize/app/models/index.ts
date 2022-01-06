import { Sequelize } from 'sequelize';

import _config from './../config/config.js';

const config: any = _config;

const sequelize = new Sequelize(config);

export {Sequelize, sequelize};
