'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      email: 'testuser1.test.com',
      username: 'testuser1',
      password: '1234',
      mobile: '010-1234-5678',
      gender: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'testuser2.test.com',
      username: 'testuser2',
      password: '1234',
      mobile: '010-1234-5678',
      gender: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'testuser3.test.com',
      username: 'testuser3',
      password: '1234',
      mobile: '010-1234-5678',
      gender: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
