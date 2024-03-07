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

const validateSpot = [
  check("address").notEmpty().withMessage("Street address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("state").notEmpty().withMessage("State is required"),
  check("country").notEmpty().withMessage("Country is required"),
  check("lat").isFloat().withMessage("Latitude is not valid"),
  check("lng").isFloat().withMessage("Longitude is not valid"),
  check("name")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description").notEmpty().withMessage("Description is required"),
  check("price").notEmpty().withMessage("Price per day is required"),
];

const router = express.Router();
// Get All Spots
// router.get("/", async (req, res) => {
//   const spots = await Spot.findAll({
//     include: [SpotImage, Review],
//   });
//   return res.json(spots);
// });

// Create a Spot
router.post("/", requireAuth, async (req, res, next) => {

});



//Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId);

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

//Get Details of a Spot from Id
router.get("/:spotId", async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
          attributes: ["id", "url", "preview"],
        },
        {
          model: User,
          as: "Owner",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const numReviews = await Review.count({ where: { spotId } });
    const totalStars = await Review.sum("stars", { where: { spotId } });
    const avgStarRating =
      numReviews > 0 ? (totalStars / numReviews).toFixed(1) : 0;

    const response = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews,
      avgStarRating,
      SpotImages: spot.SpotImages,
      Owner: spot.Owner,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching spot details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//create a spot
module.exports = router;
