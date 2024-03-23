const router = require("express").Router();

const { asyncHandler } = require("../middlewares/asyncHandler");
const videoSpeakerController = require("../controllers/videoSpeaker.controller");

router
  .route("/listSpeaker")
  .get(asyncHandler(videoSpeakerController.listCategories));
router
  .route("/addSpeaker")
  .post(asyncHandler(videoSpeakerController.addCategory));

module.exports = router;
