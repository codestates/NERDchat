'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Favorites', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Favorites_fk_userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Favorites', {
      fields: ['gameId'],
      type: 'foreign key',
      name: 'Favorites_fk_gameId',
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
    await queryInterface.removeConstraint('Favorites', 'Favorites_fk_userId');
    await queryInterface.removeColumn('Favorites', 'userId');
    await queryInterface.removeConstraint('Favorites', 'Favorites_fk_gameId');
    await queryInterface.removeColumn('Favorites', 'gameId');
  }
};
