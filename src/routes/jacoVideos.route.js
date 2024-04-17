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
router
  .route("/searchVideos")
  .get(asyncHandler(jacoVideosController.searchVideos));
router
  .route("/fetchSocialVideos")
  .get(asyncHandler(jacoVideosController.fetchSocialVideos));
router
  .route("/getLastVideo")
  .get(asyncHandler(jacoVideosController.getLastVideo));
router
  .route("/wildSearchVideos")
  .post(asyncHandler(jacoVideosController.wildSearchVideos));
router
  .route("/getVideoDetailsById")
  .get(asyncHandler(jacoVideosController.getVideoDetailsById));

module.exports = router;
