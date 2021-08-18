'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			login: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			password_hash: {
				type: Sequelize.STRING
			},
			public_key: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,	
				allowNull: false,
				unique: true
			},
			status: {
				type: Sequelize.TINYINT,
				allowNull: false,
				defaultValue: 0
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