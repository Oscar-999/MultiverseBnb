"use strict";

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users";
    await queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Walter",
          lastName: "White",
          email: "heisenberg@gmail.com",
          username: "Heisenberg",
          profilePic: "https://multibnb.s3.amazonaws.com/WalterWhitePfp.png",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          firstName: "Tony",
          lastName: "Stark",
          email: "ironman@gmail.com",
          username: "Ironman",
          profilePic: "",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Son",
          lastName: "Goku",
          email: "gokuson@gmail.com",
          username: "Kakarot",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Test",
          lastName: "User",
          email: "testuser@gmail.com",
          username: "demouser",
          hashedPassword: bcrypt.hashSync("password123"),
        },
        {
          firstName: "Mordecai",
          lastName: "Rigby",
          email: "regularshow@gmail.com",
          username: "Slackers",
          hashedPassword: bcrypt.hashSync("regularshow"),
        },
        {
          firstName: "Gumball",
          lastName: "Watterson",
          email: "gumball@gmail.com",
          username: "Gumball",
          hashedPassword: bcrypt.hashSync("gumball"),
        },
        {
          firstName: "Spongebob",
          lastName: "Squarepants",
          email: "spongebob@gmail.com",
          username: "Spongebob",
          hashedPassword: bcrypt.hashSync("spongebobss"),
        },
        {
          firstName: "Patick",
          lastName: "Star",
          email: "patrick@gmail.com",
          username: "Patrick",
          hashedPassword: bcrypt.hashSync("patrickss"),
        },
        {
          firstName: "Mr",
          lastName: "Krabs",
          email: "krabs@gmail.com",
          username: "MrKrabs",
          hashedPassword: bcrypt.hashSync("Krabsss"),
        },
        {
          firstName: "Sandy",
          lastName: "Cheeks",
          email: "sandy@gmail.com",
          username: "SandyCheeks",
          hashedPassword: bcrypt.hashSync("Sandyss"),
        },
        {
          firstName: "Bart",
          lastName: "Simpson",
          email: "bart@simpson.com",
          username: "Bart",
          hashedPassword: bcrypt.hashSync("Bartss"),
        },
        {
          firstName: "Marge",
          lastName: "Simpson",
          email: "marge@simpson.com",
          username: "Marge",
          hashedPassword: bcrypt.hashSync("Margess"),
        },
        {
          firstName: "Homer",
          lastName: "Simpson",
          email: "homer@simpson.com",
          username: "Homer",
          hashedPassword: bcrypt.hashSync("Homerss"),
        },
        {
          firstName: "Lisa",
          lastName: "Simpson",
          email: "lisa@simpson.com",
          username: "Lisa",
          hashedPassword: bcrypt.hashSync("Lisass"),
        },
        //15
        {
          firstName: "Kenny",
          lastName: "McCormick",
          email: "kenny@southpark.com",
          username: "KennyMcCormick",
          hashedPassword: bcrypt.hashSync("Kennyss"),
        },
        {
          firstName: "Eric",
          lastName: "Cartman",
          email: "eric@southpark.com",
          username: "EricCartman",
          hashedPassword: bcrypt.hashSync("Ericsss"),
        },
        {
          firstName: "Kyle",
          lastName: "Broflovski",
          email: "kyle@southpark.com",
          username: "KyleBroflovski",
          hashedPassword: bcrypt.hashSync("Kylesss"),
        },
        {
          firstName: "Stan",
          lastName: "Marsh",
          email: "stan@southpark.com",
          username: "StanMarsh",
          profilePic: "https://multibnb.s3.amazonaws.com/StanMarshPfp.gif",
          hashedPassword: bcrypt.hashSync("Stansss"),
        },
        {
          firstName: "Kevin",
          lastName: "McCallister",
          email: "kevin@homealone.com",
          username: "KevinakaSaw",
          profilePic: "https://multibnb.s3.amazonaws.com/KM+png.png",
          hashedPassword: bcrypt.hashSync("kevinsss"),
        },
        {
          firstName: "Finn",
          lastName: "Mertens",
          email: "finn@adventuretime.com",
          username: "finn",
          profilePic: "https://multibnb.s3.amazonaws.com/Finn.jpg",
          hashedPassword: bcrypt.hashSync("finnsss"),
        },
        {
          firstName: "Steven",
          lastName: "Universe",
          email: "steven@stevenuniverse.com",
          username: "StevenUniverse",
          profilePic: "https://multibnb.s3.amazonaws.com/Su.gif",
          hashedPassword: bcrypt.hashSync("finnsss"),
        },
        {
          firstName: "Beast",
          lastName: "Boy",
          email: "beastboy@titans.com",
          username: "BeastBoy",
          profilePic: "https://multibnb.s3.amazonaws.com/BeastBoy.jpg",
          hashedPassword: bcrypt.hashSync("beastsss"),
        },
        {
          firstName: "Invader",
          lastName: "Zim",
          email: "zim@invader.com",
          username: "Zim",
          profilePic:
            "https://multibnb.s3.amazonaws.com/d1a74c2aef494d5baf27cc767b1c970d.jpg",
          hashedPassword: bcrypt.hashSync("invadersss"),
        },
        {
          firstName: "Grunkle ",
          lastName: "Stan",
          email: "stan@gravityfalls.com",
          username: "GrunkleStan",
          profilePic: "https://multibnb.s3.amazonaws.com/Grunklepfp.jpg",
          hashedPassword: bcrypt.hashSync("stannnsss"),
        },
        {
          firstName: "Dipper",
          lastName: "Pines",
          email: "dipper@gravityfalls.com",
          username: "DipperPines",
          profilePic: "https://multibnb.s3.amazonaws.com/Dipper.jpg",
          hashedPassword: bcrypt.hashSync("diperpinesss"),
        },
        {
          firstName: "Mabel",
          lastName: "Pines",
          email: "mabel@gravityfalls.com",
          username: "MabelPines",
          profilePic: "https://multibnb.s3.amazonaws.com/Mabelpfp.jpg",
          hashedPassword: bcrypt.hashSync("mabelpinesss"),
        },
        {
          firstName: "Dick",
          lastName: "Grayson",
          email: "robin@titans.com",
          username: "Robin",
          profilePic: "https://multibnb.s3.amazonaws.com/Robin+Pfp.jpg",
          hashedPassword: bcrypt.hashSync("robinnn"),
        },
        //28
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "Heisenberg",
            "Ironman",
            "Kakarot",
            "demouser",
            "Slackers",
            "Gumball",
            "Spongebob",
            "Patrick",
            "SandyCheeks",
            "Bart",
            "Marge",
            "Homer",
            "Lisa",
            "KennyMcCormick",
            "EricCartman",
            "KyleBroflovski",
            "StanMarsh",
            "KevinakaSaw",
            "finn",
            "StevenUniverse",
            "BeastBoy",
            "Zim",
            "GrunkleStan",
            "DipperPines",
            "MabelPines",
            "Robin",
          ],
        },
      },
      {}
    );
  },
};
