const router = require("express").Router();

const { asyncHandler } = require("../middlewares/asyncHandler");
const jacoVideosController = require("../controllers/jacoVideos.controller");

router
  .route("/fetchGalleryVideos")
  .get(asyncHandler(jacoVideosController.fetchGalleryVideos));
router
  .route("/getVideosByCollectionName")
  .post(asyncHandler(jacoVideosController.getVideosByCollectionName));
router.route("/listVideos").get(asyncHandler(jacoVideosController.listVideos));
router.route("/addVideos").post(asyncHandler(jacoVideosController.addVideos));

module.exports = router;
