const router = require("express").Router();

const { asyncHandler } = require("../middlewares/asyncHandler");
const videoCollectionsController = require("../controllers/videoCollections.controller");

router
  .route("/listCategory")
  .get(asyncHandler(videoCollectionsController.listCollections));
router
  .route("/addCategory")
  .post(asyncHandler(videoCollectionsController.addCollection));

module.exports = router;
