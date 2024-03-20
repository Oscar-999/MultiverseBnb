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
const { multipleMulterUpload,  multiplePublicFileUpload,} = require('../../awsS3')
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
  handleValidationErrors,
];

const router = express.Router();


// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  const startDay = new Date(startDate);
  const lastDay = new Date(endDate);
  const comment = {
    message: "Sorry, this spot is already booked for the specified dates",
    errors: {},
  };

  if (!spot || spot.ownerId === user.id) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (startDay >= lastDay) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot come before startDate",
      },
    });
  }

  const allBookings = await Booking.findAll({
    where: {
      spotId: spot.id,
    },
  });

  allBookings.forEach((e) => {
    if (e.startDate <= startDay && e.endDate >= startDay) {
      comment.errors.startDate =
        "Start date conflicts with an existing booking";
    }
    if (e.endDate >= lastDay && e.startDate <= lastDay) {
      comment.errors.endDate = "End date conflicts with an existing booking";
    }
  });

  if (Object.keys(comment.errors).length) {
    return res
      .status(403)
      .json({ message: comment.message, errors: comment.errors });
  } else {
    const booking = await Booking.create({
      spotId: spot.id,
      userId: user.id,
      startDate: startDay,
      endDate: lastDay,
    });

    const scheduleDates = {
      id: booking.id,
      spotId: spot.id,
      userId: user.id,
      startDate: startDate,
      endDate: endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };

    return res.status(200).json(scheduleDates);
  }
});

const reviewCreate = [
  check("review").exists({ checkFalsy: true }),
  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

//Create a Review from a Spot based on the Spot's id
router.post("/:spotId/reviews", reviewCreate, requireAuth, async (req, res) => {
  try {
    const { review, stars } = req.body;
    const { user } = req;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot Could not be found" });
    }

    const existingReview = await Review.findOne({
      where: {
        userId: user.id,
        spotId: req.params.spotId,
      },
    });

    if (existingReview) {
      return res
        .status(409)
        .json({ message: "User already has a review for this spot" });
    }

    const createdReview = await Review.create({
      userId: user.id,
      spotId: spot.id,
      review: review,
      stars: stars,
    });

    return res.status(201).json(createdReview);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;

  try {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== user.id) {
      const notOwnerBookings = await Booking.findAll({
        where: {
          spotId: req.params.spotId,
        },
        attributes: ["spotId", "startDate", "endDate"],
      });

      return res.status(200).json({ Bookings: notOwnerBookings });
    } else {
      const ownerBookings = await Booking.findAll({
        where: {
          spotId: req.params.spotId,
        },
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      });

      return res.status(200).json({ Bookings: ownerBookings });
    }
  } catch (error) {
    next(error);
  }
});

// Get all spots owned by the current user
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const spots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
    include: [
      {
        model: SpotImage,
        as: "SpotImages",
        where: { preview: true },
        required: false,
      },
      {
        model: Review,
        as: "Reviews",
        attributes: [
          [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        ],
        required: false,
      },
    ],
    group: ["Spot.id", "SpotImages.id", "Reviews.id"],
  });

  const formattedSpots = spots.map((spot) => {
    let avgRating = 0;

    if (spot.Reviews && spot.Reviews.length > 0) {
      avgRating = parseFloat(spot.Reviews[0].getDataValue("avgRating")).toFixed(
        1
      );
    }

    const previewImage =
      spot.SpotImages && spot.SpotImages.length > 0
        ? spot.SpotImages[0].url
        : null;

    return {
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
      avgRating: avgRating,
      previewImage: previewImage,
    };
  });

  res.status(200).json({ Spots: formattedSpots });
});

//Get all Reviews based on Spots Id
router.get("/:spotId/reviews", async (req, res) => {
  try {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
      where: {
        spotId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "username", "profilePic"],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });

    return res.json({ Reviews: reviews });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Add an Image to a Spot based on Id
router.post("/:spotId/images", requireAuth, async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { url, preview } = req.body;

    // Check if the spot exists and belongs to the current user
    const spot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: userId,
      },
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Create the image
    const image = await SpotImage.create(
      {
        spotId,
        url,
        preview,
      },
      {
        // Exclude createdAt, updatedAt, and spotId fields
        attributes: { exclude: ["createdAt", "updatedAt", "spotId"] },
      }
    );

    // Remove the updatedAt, createdAt, and spotId fields from the image object
    const {
      updatedAt,
      createdAt,
      spotId: imageSpotId,
      ...imageWithoutTimestamps
    } = image.toJSON();

    res.status(200).json(imageWithoutTimestamps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a Spot
router.post("/", validateSpot, requireAuth, async (req, res) => {
  try {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const userId = req.user.id;
    const newSpot = await Spot.create({
      ownerId: userId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    return res.status(201).json(newSpot);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Edit a Spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  try {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    if (spot.ownerId !== userId) {
      return res.status(403).json({ message: "You don't own this spot" });
    }

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    return res.status(200).json(spot);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
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
    const avgStarRating = numReviews > 0 ? totalStars / numReviews : 0;

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

//Get all Spots
const validateGetAllSpots = [
  check("page")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Page must be an integer between 1 and 10."),
  check("size")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be an integer between 1 and 20."),
  check("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid."),
  check("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid."),
  check("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid."),
  check("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid."),
  check("minPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Minimum price must be a decimal greater than or equal to 0."),
  check("maxPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Maximum price must be a decimal greater than or equal to 0."),
  handleValidationErrors,
];

// Get all spots
router.get("/", validateGetAllSpots, async (req, res) => {
  const errors = {};
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  page = parseInt(page) || 1;
  size = parseInt(size) || 20;

  if (isNaN(page) || page < 1 || page > 10) {
    errors.page = "Page must be between 1 and 10";
  }

  if (isNaN(size) || size < 1 || size > 20) {
    errors.size = "Size must be between 1 and 20";
  }

  if (maxLat !== undefined && isNaN(maxLat)) {
    errors.maxLat = "Maximum latitude is invalid";
  }

  if (minLat !== undefined && isNaN(minLat)) {
    errors.minLat = "Minimum latitude is invalid";
  }

  if (minLng !== undefined && isNaN(minLng)) {
    errors.minLng = "Minimum longitude is invalid";
  }

  if (maxLng !== undefined && isNaN(maxLng)) {
    errors.maxLng = "Maximum longitude is invalid";
  }

  if (minPrice !== undefined && (isNaN(minPrice) || minPrice < 0)) {
    errors.minPrice = "Minimum price must be greater than or equal to 0";
  }

  if (maxPrice !== undefined && (isNaN(maxPrice) || maxPrice < 0)) {
    errors.maxPrice = "Maximum price must be greater than or equal to 0";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  }

  const where = {};

  if (maxLat !== undefined) {
    where.lat = {
      [Op.lte]: parseFloat(maxLat),
    };
  }

  if (minLat !== undefined) {
    where.lat = {
      [Op.gte]: parseFloat(minLat),
    };
  }

  if (minLng !== undefined) {
    where.lng = {
      [Op.gte]: parseFloat(minLng),
    };
  }

  if (maxLng !== undefined) {
    where.lng = {
      [Op.lte]: parseFloat(maxLng),
    };
  }

  if (minPrice !== undefined) {
    where.price = {
      [Op.gte]: parseFloat(minPrice),
    };
  }

  if (maxPrice !== undefined) {
    where.price = {
      [Op.lte]: parseFloat(maxPrice),
    };
  }

  const pagination = {
    limit: size,
    offset: size * (page - 1),
  };

  try {
    const allSpots = await Spot.findAll({
      include: [{ model: Review }, { model: SpotImage }],
      where: where,
      ...pagination,
    });

    const spots = allSpots.map((spot) => {
      const reviewCount = spot.Reviews.length;
      const totalStars = spot.Reviews.reduce(
        (sum, review) => sum + review.stars,
        0
      );
      const avgRating = reviewCount > 0 ? totalStars / reviewCount : 0;
      const previewImage = spot.SpotImages.find(
        (image) => image.preview === true
      );

      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: parseFloat(spot.lat),
        lng: parseFloat(spot.lng),
        name: spot.name,
        description: spot.description,
        price: parseFloat(spot.price),
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: avgRating,
        previewImage: previewImage
          ? previewImage.url
          : "No preview image found",
      };
    });

    return res.status(200).json({
      Spots: spots,
      page: page,
      size: size,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
