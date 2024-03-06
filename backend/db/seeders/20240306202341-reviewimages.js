'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'ReviewImages';
   await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'https://www.tastingtable.com/img/gallery/16-places-to-eat-and-drink-in-athens-greece/l-intro-1673379087.jpg'
    },
    {
      reviewId: 2,
      url: 'https://handluggageonly.co.uk/wp-content/uploads/2015/05/Hand-Luggage-Only-7.jpg'
    },
    {
      reviewId: 3,
      url: 'https://cdn.tourradar.com/s3/tour/645x430/156843_62ac430d534a0.jpg'
    }
   ], {})
  },
// test
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
