const mongoose = require('mongoose');


const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'name field is required'],
    unique : true
  },
  price: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports=Tour;


