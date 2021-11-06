'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.addColumn(
			'users',
			'public_key',
			{
				type: Sequelize.STRING,
				allowNull: false,
				after: 'password_hash'
			}
		)
	},

	down: async (queryInterface) => {
		return queryInterface.removeColumn(
			'users',
			'public_key'
		)
	}
}
