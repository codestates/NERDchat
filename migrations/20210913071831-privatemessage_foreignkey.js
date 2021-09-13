'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('PrivateMessages', {
      fields: ['user1id'],
      type: 'foreign key',
      name: 'PrivateMessages_fk_user1id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('PrivateMessages', {
      fields: ['user2id'],
      type: 'foreign key',
      name: 'PrivateMessages_fk_user2id',
      references: {
        table: 'Users',
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
    await queryInterface.removeConstraint('PrivateMessages', 'PrivateMessages_fk_user1id');
    await queryInterface.removeColumn('PrivateMessages', 'user1id');
    await queryInterface.removeConstraint('PrivateMessages', 'PrivateMessages_fk_user2id');
    await queryInterface.removeColumn('PrivateMessages', 'user2id');
  }
};
