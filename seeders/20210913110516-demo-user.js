'use strict';

const { generatePassword } = require('../middlewares/crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      userId: 'tnvjakzpt',
      avatar: null,
      email: 'tnvjakzpt@nate.com',
      nickname: 'tnvjakzpt',
      password: generatePassword('1234'),
      valid: true,
      oauth: 'none',
      status: '',
      currentRoom: null,
      superuser: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 'mangpha',
      avatar: null,
      email: 'mangph4@gmail.com',
      nickname: 'mangpha',
      password: generatePassword('asdf'),
      valid: true,
      oauth: 'none',
      status: 'ready',
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
