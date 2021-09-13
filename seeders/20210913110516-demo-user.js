'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      // await queryInterface.bulkInsert('Users', [{
      //   id: 0,
      //   userId: 'tnvjakzpt',
      //   avatar: null,
      //   email: 'tnvjakzpt@nate.com',
      //   nickname: 'tnvjakzpt',
      //   password: '1234',
      //   valid: true,
      //   oauth: null,
      //   status:
      // }]);
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
