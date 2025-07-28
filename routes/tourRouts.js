const express = require("express");
const tourController=require(`${__dirname}/../controller/tourController`)

const router = express.Router();



//use middleware to check id
router.param('id',tourController.checkId)



router.route("/").get(tourController.allTour).post(tourController.checkBody,tourController.creatTour);
router.route("/:id").get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

 module.exports = router