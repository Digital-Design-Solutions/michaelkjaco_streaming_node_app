const router = require("express").Router();

const { asyncHandler } = require("../middlewares/asyncHandler");
const videoSpeakerController = require("../controllers/videoSpeaker.controller");

router
  .route("/listSpeaker")
  .get(asyncHandler(videoSpeakerController.listSpeakers));
router
  .route("/addSpeaker")
  .post(asyncHandler(videoSpeakerController.addSpeaker));

module.exports = router;
