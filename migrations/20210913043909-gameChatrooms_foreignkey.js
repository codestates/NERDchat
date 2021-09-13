'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('GameChatRooms', 'roomAdmin', Sequelize.INTEGER);
    await queryInterface.addConstraint('GameChatRooms', {
      fields: ['roomAdmin'],
      type: 'foreign key',
      name: 'GameChatRooms_fk_roomAdmin',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addColumn('GameChatRooms', 'gameId', Sequelize.INTEGER);
    await queryInterface.addConstraint('GameChatRooms', {
      fields: ['gameId'],
      type: 'foreign key',
      name: 'GameChatRooms_fk_gameId',
      references: {
        table: 'GameCategories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('GameChatRooms', 'GameChatRooms_fk_roomAdmin');
    await queryInterface.removeColumn('GameChatRooms', 'roomAdmin');
    await queryInterface.removeConstraint('GameChatRooms', 'GameChatRooms_fk_gameId');
    await queryInterface.removeColumn('GameChatRooms', 'gameId');
  }
};
