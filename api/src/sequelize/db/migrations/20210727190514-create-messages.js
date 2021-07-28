'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('messages', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			content: {
				type: Sequelize.TEXT
			},
			content_type: {
				type: Sequelize.STRING
			},
			timestamp: {
				type: Sequelize.BIGINT.UNSIGNED,
				allowNull: false
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			chatId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'chats',
					key: 'id'
				}
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
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('messages')
	}
}