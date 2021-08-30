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
    return queryInterface.bulkInsert('Users', [
      {
        id: '9e432cf8-0fbf-4723-b89d-f071dee0a47b',
        username: 'toidaidot',
        role: 'admin',
        full_name: 'Peter Parker',
        email: 'toidaidot@yahoo.com',
        hash: '$2b$10$jNrqky8emMKbJgI/zMbtoulTZTRwO9ACLuxO/E08CSLx0GooDeqIO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3ce3237b-e19f-4cde-ace9-c7bdb6c1b1a0',
        username: 'bexuanmai',
        role: 'user',
        full_name: 'Xuan Thị Mai',
        email: 'xuanthimai@gmail.com',
        hash: '$2b$10$04hjLDIfC52oJB/VMzZbRuAszCy.sU.xIUmui0e9ziUhBMGn4uMjC',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
