const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Review,
  User,
  SpotImage,
  Spot,
  ReviewImage,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { where } = require("sequelize");
const router = express.Router();

const validateReviewEdit = [
  check("review").exists({ checkFalsy: true }),
  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

//Current User Reviews
router.get("/current", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await Review.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Spot,
          attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "price",
          ],
          include: [
            {
              model: SpotImage,
              attributes: ["id", "url"],
              where: { preview: true },
              required: false,
            },
          ],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });

    const formattedReviews = reviews.map((review) => {
      const formatReview = review.toJSON();
      const spotImages = formatReview.Spot.SpotImages;
      formatReview.Spot.previewImage =
        spotImages.length > 0 ? spotImages[0].url : null;
      delete formatReview.Spot.SpotImages;

      return formatReview;
    });
    return res.status(200).json({ Reviews: formattedReviews });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
});

//Edit a review
router.put("/:reviewId", requireAuth, validateReviewEdit, async (req, res) => {
  try {
    const userId = req.user.id;
    const { stars, review } = req.body;
    const reviewId = req.params.reviewId;

    const reviewEdit = await Review.findByPk(reviewId);

    if (!reviewEdit) {
      return res.status(404).json({ message: "Review not Found" });
    }
    if (reviewEdit.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this review" });
    }

    reviewEdit.review = review;
    reviewEdit.stars = stars;

    await reviewEdit.save();
    return res.status(300).json(reviewEdit);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  try {
    const { url } = req.body;
    const  userId  = req.user.id;
    const reviewId = req.params.reviewId;

    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "This Review doesn't exist" });
    }

    if (userId !== review.userId) {
      return res
        .status(403)
        .json({ message: "You don't have permission to do this" });
    }
    const allImages = await ReviewImage.findAll({
      where: {
        reviewId: req.params.reviewId,
      },
    });

    if (allImages.length < 10) {
      const image = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url: url,
      });

      return res.json({ id: image.id, url });
    } else {
      return res.status(403).json({
        message: "Maximum number of images for this resource was reached",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "This Review does not exist" });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ message: "You don't own this review" });
    }

    review.destroy();
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
