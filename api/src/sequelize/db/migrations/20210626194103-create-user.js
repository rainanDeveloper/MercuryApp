'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			login: {
				type: Sequelize.STRING
			},
			password: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			status: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('users')
	}
}