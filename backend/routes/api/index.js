const router = require("express").Router();
const sessionRouter = require("./session.js");
const spotRouter = require("./spots.js")
const usersRouter = require("./users.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/spots", spotRouter)
router.use("/users", usersRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
