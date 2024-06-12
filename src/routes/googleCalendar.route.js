const router = require("express").Router();

const { asyncHandler } = require("../middlewares/asyncHandler");
const googleCalendarEventsController = require("../controllers/googleCalendarEvents");

const ensureAuthenticated = require('../controllers/googleCalendarEvents')
router
  .route("/")
  .get(asyncHandler(googleCalendarEventsController.getEvnets));
  

  router
  .route("/auth")
  .get(asyncHandler(googleCalendarEventsController.auth));
  router
  .route("/oauth2callback")
  .get(asyncHandler(googleCalendarEventsController.oauth2callback));
  
  module.exports = router;
