'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordRecoveryRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PasswordRecoveryRequests.init({
    invalid: DataTypes.BOOLEAN,
    otgCode: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PasswordRecoveryRequests',
  });
  return PasswordRecoveryRequests;
};