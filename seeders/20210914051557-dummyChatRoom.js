'use strict';

const { v4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('GameChatRooms', [{
      roomAdmin: null,
      roomTitle: '듀오 서폿 구함',
      uuid: v4(),
      gameId: 1,
      max: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roomAdmin: null,
      roomTitle: 'rr',
      uuid: v4(),
      gameId: 1,
      max: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('GameChatRooms', null, {});
  }
};
