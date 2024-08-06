const router = require("express").Router();

const { asyncHandler } = require("../middlewares/asyncHandler");
const notificationControlloer = require("../controllers/notifications.controller");

router
  .route("/listNotification")
  .get(asyncHandler(notificationControlloer.listNotification));
router
  .route("/addNotification")
  .post(asyncHandler(notificationControlloer.addNotification));

module.exports = router;
