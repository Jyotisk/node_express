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
    // let queryStr = JSON.stringify(queryObj);

    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    // const filter=JSON.parse(queryStr)

    let filter = {};

    Object.keys(queryObj).forEach((key) => {
      if (key.includes("[")) {
        // example: "duration[gte]"
        const [field, operator] = key.split("["); // ["duration", "gte]"]
        const op = operator.replace("]", ""); // "gte"

        if (!filter[field]) filter[field] = {};
        filter[field][`$${op}`] = Number(queryObj[key]); // convert value to number
      } else {
        filter[key] = queryObj[key]; // normal key=value
      }
    });

    let query = Tour.find(filter);
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

    //3 Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");

      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const numTour = await Tour.countDocuments();
      if (skip >= numTour) throw new Error("This page does not exis");
    }
    query = query.skip(skip).limit(limit);

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
