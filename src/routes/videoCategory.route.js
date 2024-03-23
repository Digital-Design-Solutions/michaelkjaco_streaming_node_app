const router = require("express").Router();

const { asyncHandler } = require("../middlewares/asyncHandler");
const videoCategoryController = require("../controllers/videoCategory.controller");

router
  .route("/listCategory")
  .get(asyncHandler(videoCategoryController.listCategories));
router
  .route("/addCategory")
  .post(asyncHandler(videoCategoryController.addCategory));

module.exports = router;
