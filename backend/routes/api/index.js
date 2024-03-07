const router = require("express").Router();
const sessionRouter = require("./session.js");
const spotRouter = require("./spots.js");
const usersRouter = require("./users.js");
const spotImagesRouter = require("./spot-images.js");
const reviewRouter = require('./reviews.js')
const reviewImagesRouter = require("./review-image.js")
const bookingRouter = require("./booking.js")
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotRouter);
router.use("/spot-images", spotImagesRouter);
router.use("/reviews", reviewRouter);
router.use("/review-images", reviewImagesRouter)
router.use("/bookings", bookingRouter);
router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
