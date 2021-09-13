'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Friends', 'user1id', Sequelize.INTEGER);
    await queryInterface.addConstraint('Friends', {
      fields: ['user1id'],
      type: 'foreign key',
      name: 'Friends_fk_user1id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addColumn('Friends', 'user2id', Sequelize.INTEGER);
    await queryInterface.addConstraint('Friends', {
      fields: ['user2id'],
      type: 'foreign key',
      name: 'Friends_fk_user2id',
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
    await queryInterface.removeConstraint('Friends', 'Friends_fk_user1id');
    await queryInterface.removeColumn('Friends', 'user1id');
    await queryInterface.removeConstraint('Friends', 'Friends_fk_user2id');
    await queryInterface.removeColumn('Friends', 'user2id');
  }
};
