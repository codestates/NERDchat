'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Users', {
      fields: ['currentRoom'],
      type: 'foreign key',
      name: 'Users_fk_currentRoom',
      references: {
        table: 'GameChatRooms',
        field: 'uuid'
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
    await queryInterface.removeConstraint('Users', 'Users_fk_currentRoom');
    await queryInterface.removeColumn('Users', 'currentRoom');
  }
};
