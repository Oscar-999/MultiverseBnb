"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
    options.tableName = "Spots";
    await queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 5,
          address: "123 Park Lane",
          city: "Elmore",
          state: "CartoonNetwork",
          country: "United States",
          lat: 37.7749,
          lng: -118.2437,
          name: "Regular Show House",
          description: "The Regular Show",
          price: 300.0,
        },
        {
          ownerId: 1,
          address: "9809 Margo Street SW",
          city: " Albuquerque",
          state: "New Mexico",
          country: "United States",
          lat: 48.7989,
          lng: -169.2697,
          name: "Breaking Bad House",
          description: "i am the danger",
          price: 120.0,
        },
        {
          ownerId: 2,
          address: "555 Avengers Avenue",
          city: "New York City",
          state: "NewYork",
          country: "United States",
          lat: 34.0522,
          lng: -118.2437,
          name: "Stark Tower",
          description: "Stark Tower is a famous bu .",
          price: 590.0,
        },
        {
          ownerId: 6,
          address: "12 Cartoon Lane",
          city: "Elmore",
          state: "CartoonNetwork",
          country: "United States",
          lat: 35.679,
          lng: 70.3459,
          name: "Amazing World of Gumball House",
          description: "The Amazing World of Gumball house is a .",
          price: 599.99,
        },
        {
          ownerId: 3,
          address: "124 Island Dr",
          city: "Dragonball",
          state: "Hawaii",
          country: "United States",
          lat: 88.9832,
          lng: 46.3455,
          name: "Kame House",
          description: "Warriors are made here!",
          price: 189.99,
        },
        {
          ownerId: 3,
          address: "112 Unknown st",
          city: "Gotham",
          state: "New Jersey",
          country: "United States",
          lat: 30.13545,
          lng: 45.78989,
          name: "Bat Cave",
          description: "The Bat Cave is Batmans.",
          price: 20.99,
        },
        {
          ownerId: 7,
          address: "124 Conch Street",
          city: "Bikini Bottom",
          state: "Pacific Ocean",
          country: "United States",
          lat: 39.13545,
          lng: 48.78989,
          name: "The Pineapple",
          description: "The Pineapple is Spongebobs.",
          price: 1.99,
        },
        {
          ownerId: 11,
          address: "742 Evergreen Terrace",
          city: "Springfield",
          state: "Oregonia",
          country: "United States",
          lat: 22.13545,
          lng: 16.78989,
          name: "The Simpson Family Home",
          description:
            "I wanna rent out my family home I need a new Skateboard.",
          price: 999.99,
        },
        {
          ownerId: 24,
          address: "618 Gopher Road",
          city: "Gravity Falls",
          state: "Oregon",
          country: "United States",
          lat: 78.13545,
          lng: 16.78989,
          name: "The Mystery Shack",
          description:
"Quirky and eccentric, the Mystery Shack is a supernatural emporium located in Gravity Falls, where the weird and mysterious come alive.",
          price: 200.99,
        },
        //10
        {
          ownerId: 8,
          address: "120 Conch Street",
          city: "Bikini Bottom",
          state: "Pacific Ocean",
          country: "United States",
          lat: 56.13545,
          lng: 19.78989,
          name: "Rock",
          description:
          "Patrick's rock-shaped home, a simple abode under a large boulder, exudes carefree charm in Bikini Bottom's aquatic neighborhood.",
          price: 130.0,
        },
        {
          ownerId: 23,
          address: "120 Zim Base",
          city: "Devastis",
          state: "Unknown Planet",
          country: "United States",
          lat: 23.13545,
          lng: 81.78989,
          name: "Zim's Base",
          description:
          "Invader Zim's home is a spooky, dark, and mysterious place, filled with a variety of gadgets and devices.",
          price: 90.0,
        },
        {
          ownerId: 21,
          address: "10925 Beach City",
          city: "Delmarva",
          state: "Unknown",
          country: "United States",
          lat: 43.13545,
          lng: 22.78989,
          name: "The Crystal Temple",
          description:
          "A magical haven for Steven and his friends its vibrant design reflects the gem-based characters who reside there.",
          price: 100.0,
        },
        {
          ownerId: 19,
          address: "671 Lincoln Avenue",
          city: "Winnetka",
          state: "Illinois",
          country: "United States",
          lat: 92.13545,
          lng: 72.78989,
          name: "Home alone House",
          description:
          "The Home Alone house is a charming two-story red-brick residence known for its iconic appearance in the holiday film.",
          price: 100.0,
        },
        {
          ownerId: 22,
          address: "123 Titan Way",
          city: "Jump City",
          state: "Illinois",
          country: "United States",
          lat: 45.13545,
          lng: 72.78989,
          name: "Teen Titans Tower",
          description:
          "A futuristic skyscraper which is the central hub for the superhero team the teen titans.",
          price: 78.0,
        },
        {
          ownerId: 16,
          address: "133 Packer st",
          city: "South Park",
          state: "Colorado",
          country: "United States",
          lat: 36.13545,
          lng: 43.78989,
          name: "South Park Homes",
          description:
          "Home to the south park crew known for its green exterior and distinct appearance.",
          price: 65.0,
        },
        {
          ownerId: 20,
          address: "133 Enchanted Grove",
          city: "Land of ooo",
          state: "Tree",
          country: "Earth AdventureTime",
          lat: 36.13545,
          lng: 43.78989,
          name: " Fin and Jack's Treehouse",
          description:
          "A whimsical haven perched in a tree the land of Ooo is filled with charm and wonde.",
          price: 28.0,
        },
      ],
      {}
    );
  },
  //j
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12,13,14,15,16] },
      },
      {}
    );
  },
};
