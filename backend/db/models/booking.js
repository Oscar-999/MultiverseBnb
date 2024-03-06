"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: "userId" }),
        Booking.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Booking.init(
    {
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
