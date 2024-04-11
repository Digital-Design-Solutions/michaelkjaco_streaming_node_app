const router = require("express").Router();

const { asyncHandler } = require("../middlewares/asyncHandler");
const videoCollectionsController = require("../controllers/videoCollections.controller");

router
  .route("/listCollections")
  .get(asyncHandler(videoCollectionsController.listCollections));
router
  .route("/addCollection")
  .post(asyncHandler(videoCollectionsController.addCollection));

module.exports = router;
