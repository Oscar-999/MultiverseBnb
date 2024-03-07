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
    return res.status(200).json({ message: "Successfully delete booking" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Todo Current User Bookings
router.get("/current", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Spot,
          attributes: { exclude: ["createdAt", "updatedAt", "description"] },
          include: [
            {
              model: SpotImage,
              as: "SpotImages",
              attributes: ["id", "url"],
              where: { preview: true },
              required: false,
            },
          ],
        },
      ],
    });


    const formatBookings = [];

    bookings.forEach((booking) => {
      const spot = booking.Spot;
      const previewImage =
        spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;

      formatBookings.push({
        id: booking.id,
        spotId: booking.spotId,
        Spot: {
          id: spot.id,
          ownerId: spot.ownerId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: spot.lat,
          lng: spot.lng,
          name: spot.name,
          price: spot.price,
          previewImage: previewImage,
        },
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      });
    });
    if (formatBookings.length === 0) {
      return res.status(404).json({ message: "No Bookings" });
    }
    return res.status(200).json({ Bookings: formatBookings });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
});


//Edit a Booking
router.put('/:bookingId', requireAuth, async(req,res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;
    const startDate = req.body.startDate
    const endDate = req.body.endDate

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({message: "This Booking Could not be Found"})
    }

    if (userId !== booking.userId) {
      return res.status(403).json({
        message: "You must be the owner of this booking to edit"
      })
    }

    if (booking.endDate < new Date()) {
      return res
        .status(403)
        .json({ message: "Past bookings can't be modified" });
    }

    //Removes the Time Portion
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    //Conflicts
    const conflictingBooking = await Booking.findOne({
      where: {
        spotId: booking.spotId,
        startDate:{[Op.lte]: formattedEndDate },
        endDate: {[Op.gte]: formattedStartDate },
        id: { [Op.not]: booking.id },
      },
    });

    if (conflictingBooking) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    booking.startDate = formattedStartDate;
    booking.endDate = formattedEndDate;

    await booking.save()
    return res.status(200).json(booking)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})


module.exports = router;
