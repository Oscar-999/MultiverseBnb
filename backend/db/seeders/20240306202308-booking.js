'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

   options.tableName = 'Bookings';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      startDate: '2023-05-05',
      endDate: '2023-05-19'
    },
    {
      spotId: 2,
      userId: 2,
      startDate: '2023-09-04',
      endDate: '2023-09-22'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2023-08-05',
      endDate: '2023-08-17'
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};

