'use strict';

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
    await queryInterface.bulkInsert('GameCategories', [{
      image: 'https://cdn1.dotesports.com/wp-content/uploads/2019/09/12195522/league-of-legends.jpg',
      category: 'League Of Legends',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      image: 'https://assets.nintendo.com/image/upload/c_pad,f_auto,h_613,q_auto,w_1089/ncom/en_US/games/switch/d/dead-by-daylight-switch/hero?v=2021090716',
      category: 'Dead By Daylight',
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
    await queryInterface.bulkDelete('GameCateGories', null, {});
  }
};
