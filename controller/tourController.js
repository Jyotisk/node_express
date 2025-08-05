const Tour = require("./../models/tourModel");

// exports.checkId = (req, res, next, val) => {
//   if (req.params.id === "5c88fa8cf4afda39709c2955") {
//     return res.status(404).json({
//       status: "fail",
//       message: "data not accessable",
//     });
//   }
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price)
//     return res.status(400).json({
//       status: "failed",
//       message: "price and name field is required",
//     });
//   next();
// };

exports.allTour = async (req, res) => {
  try {
    const allTour = await Tour.find();
    res.status(200).json({
      status: "success",
      data: {
        allTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      tour: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    Tour.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      Error: err,
    });
  }
};

exports.creatTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: "Success",
      tour: newTour,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      tour: err,
    });
  }

  // const newId = tours[tours.length - 1]._id + 1;
  // const testTour = new Tour({
  //   name: "Test tour",
  //   price: 500,
  //   rate: 6.5,
  // });
  // testTour
  //   .save()
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(`Error : ${err}`);
  //   });
  // // Optional: Fetch data
  // Tour.find().then((data) => {
  //   console.log("Tours data:", data);
  // });
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "<updated successfully>",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      Error: error,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "<deleted successfully>",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      Error: error,
    });
  }
};
