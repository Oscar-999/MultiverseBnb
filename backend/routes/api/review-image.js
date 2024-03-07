const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Review, ReviewImage } = require("../../db/models");

const router = express.Router();

// Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const reviewImageId = req.params.imageId;

    const reviewImage = await ReviewImage.findByPk(reviewImageId, {
      include: {
        model: Review,
      },
    });

    if(!reviewImage) {
        return res.status(404).json({message: "This Review Image does not exist"})
    }
    if (reviewImage.Review.userId !== userId) {
        return res.status(403).json({message: "You do not own this image"})
    }
    reviewImage.destroy()
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(505).json({ message: "InternalServerError" });
  }
});

module.exports = router;
