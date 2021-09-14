'use strict';

const { generatePassword } = require('../middlewares/crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 0,
      userId: 'tnvjakzpt',
      avatar: null,
      email: 'tnvjakzpt@nate.com',
      nickname: 'tnvjakzpt',
      password: generatePassword('1234'),
      valid: true,
      oauth: null,
      status: null,
      currentRoom: null,
      superuser: true,
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
