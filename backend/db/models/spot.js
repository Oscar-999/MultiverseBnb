"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" }),
        Spot.hasMany(models.Booking, {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true,
        }),
        Spot.hasMany(models.Review, {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true,
        }),
        Spot.hasMany(models.SpotImage, {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true,
        });
    }
  }

  Spot.init(
    {
      ownerId: DataTypes.INTEGER,
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
