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
    //1) Filtering
    const queryObj = { ...req.query };
    const excludedFileds = ["page", "sort", "limit", "fields"];
    excludedFileds.forEach((el) => delete queryObj[el]);

    // console.log(req.query,queryObj);
    //2) Advance quering
    let queryStr = JSON.stringify(queryObj);
    console.log(queryStr);
    
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Tour.find(JSON.parse(queryStr));
    // const allTour = await Tour.find({
    //   duration: 5,
    //   difficulty: "easy",
    // });
    // const allTour = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");
    // const allTour = await Tour.find();

    //execute the query
    const allTour = await query;

    res.status(200).json({
      status: "success",
      data: {
        allTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      tour: error,
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
