const express = require("express");
const tourController = require(`${__dirname}/../controller/tourController`);
const authController = require(`${__dirname}/../controller/authController`);
const router = express.Router();

//use middleware to check id
// router.param('id',tourController.checkId)

// router.route("/").get(tourController.allTour).post(tourController.checkBody,tourController.creatTour);
router
  .route("/")
  .get(authController.protect, tourController.allTour)
  .post(tourController.creatTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin","lead-guide"),
    tourController.deleteTour,
  );

module.exports = router;
