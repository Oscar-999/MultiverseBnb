const router = require("express").Router();
const sessionRouter = require("./session.js");
const spotRouter = require("./spots.js");
const usersRouter = require("./users.js");
const spotImagesRouter = require("./spot-images.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotRouter);
router.use("/spot-images", spotImagesRouter);
router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
