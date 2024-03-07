const express = require("express");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();
const { Op } = require("sequelize");
const { Spot, SpotImage, User, Booking } = require("../../db/models");

//Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;

    const booking = await Booking.findByPk(bookingId, {
      include: {
        model: Spot,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.startDate <= new Date()) {
      return res
        .status(403)
        .json({ message: "Bookings that have been started can't be deleted" });
    }

    if (booking.userId !== userId && booking.Spot.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this booking" });
    }

    await booking.destroy();
    return res.status(200).json({message: "Successfully delete booking"})
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Current User Bookings
router.get("/current", requireAuth, async(req,res) => {
    try {
        const userId = req.user.id;

        const bookings = await Booking.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: Spot,
                    attributes: 
                }
            ],
        })
    } catch (error) {
        return res.status(500).json({message: "Internal Server error"})
    }
})

module.exports = router
