const express = require("express");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Booking,
  Review,
  ReviewImage,
  sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();
// Get All Spots
// router.get("/", async (req, res) => {
//   const spots = await Spot.findAll({
//     include: [SpotImage, Review],
//   });
//   return res.json(spots);
// });

//Create a Spot
// router.post("/", requireAuth, async (req, res, next) => {});

//Get Details of A Spot Id



//Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      const spotId = req.params.spotId;

      const spot = await Spot.findByPk(spotId)

      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

      if (spot.ownerId !== userId) {
        return res.status(403).json({
          message: "Forbidden - You don't have permission to delete this spot",
        });
      }

      await spot.destroy();

      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });


  module.exports = router
