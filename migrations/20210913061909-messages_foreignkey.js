'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Messages', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Messages_fk_userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Messages', {
      fields: ['roomId'],
      type: 'foreign key',
      name: 'Messages_fk_roomId',
      references: {
        table: 'GameChatRooms',
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
    await queryInterface.removeConstraint('Messages', 'Messages_fk_userId');
    await queryInterface.removeColumn('Messages', 'userId');
    await queryInterface.removeConstraint('Messages', 'Messages_fk_roomId');
    await queryInterface.removeColumn('Messages', 'roomId');
  }
};
