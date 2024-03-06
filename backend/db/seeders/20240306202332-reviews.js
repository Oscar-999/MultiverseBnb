'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

   options.tableName = 'Reviews';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      review: 'Pool rocked!',
      stars: 5
    },
    {
      spotId: 1,
      userId: 2,
      review: 'ok!',
      stars: 3
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Pool broo!',
      stars: 3
    },
    {
      spotId: 2,
      userId: 1,
      review: 'trash',
      stars: 2
    },
    {
      spotId: 2,
      userId: 2,
      review: 'Amazing!',
      stars: 2
    },
    {
      spotId: 3,
      userId: 3,
      review: 'Happiness died',
      stars: 1
    },
    {
      spotId: 3,
      userId: 2,
      review: 'Happiness sike',
      stars: 1
    },
    {
      spotId: 3,
      userId: 1,
      review: 'Happiness lies',
      stars: 1
    },

    //7
    {
      spotId: 7,
      userId: 8,
      review: 'I like this place very much',
      stars: 5
    },
    {
      spotId: 7,
      userId: 9,
      review: 'Money💵 Money💵 Money💵 Money💵 Money💵 Money💵 Money💵 Money💵',
      stars: 5
    },
    {
      spotId: 7,
      userId: 10,
      review: "🎈I love my friend Spongebob's house",
      stars: 5
    },
    //8
    {
      spotId: 8,
      userId: 12,
      review: "You have no idea what it's like, being married to you.",
      stars: 5
    },
    {
      spotId: 8,
      userId: 13,
      review: "BART!",
      stars: 1
    },
    {
      spotId: 8,
      userId: 14,
      review: "If anyone wants me, I'll be in my room.",
      stars: 2
    },
//9
{
  spotId: 9,
  userId: 25,
  review: "Strange things happen here.",
  stars: 2
},
{
  spotId: 9,
  userId: 26,
  review: "Me and my twin brother stay here every summer.",
  stars: 2
},
   ], {})
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16] }
    }, {})
  }
};
