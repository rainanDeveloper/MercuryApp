'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('password_recovery_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invalid: {
        type: Sequelize.BOOLEAN
      },
      otgCode: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
		allowNull: false,
		unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('password_recovery_requests');
  }
};