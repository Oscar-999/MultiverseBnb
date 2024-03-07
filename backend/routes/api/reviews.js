const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Review } = require("../../db/models");

const router = express.Router();

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

    review.destroy()
    return res.status(200).json({message: "Successfully Deleted"})
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
