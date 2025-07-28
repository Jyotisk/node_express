const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`)
);

exports.checkId = (req, res, next, val) => {
  if (req.params.id === "5c88fa8cf4afda39709c2955") {
    return res.status(404).json({
      status: "fail",
      message: "data not accessable",
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({
      status: "failed",
      message: "price and name field is required",
    });
  next();
};

exports.allTour = (req, res) => {
  res.status(200).json({
    message: "success",
    // 'count':tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id;

  const tour = tours.find((obj) => obj._id === id);

  res.status(200).json({
    message: "success",
    // 'count':tours.length,
    data: {
      tour,
    },
  });
};

exports.creatTour = (req, res) => {
  const newId = tours[tours.length - 1]._id + 1;

  const newTour = Object.assign({ _id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/new-tour.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "message",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    message: "<updated successfully>",
  });
};
exports.deleteTour = (req, res) => {
  res.status(200).json({
    message: "<deleted successfully>",
  });
};
