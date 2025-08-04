const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.MONGO_URI;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('DB connection successful!'))
.catch(err => console.log('DB connection error:', err));

// Define schema & model
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'name field is required'],
    unique:true
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

const testTour=new Tour({
  name:'Test tour',
  price:500,
  rate:6.5
});
testTour.save().then(res=>{
  console.log(res);
  
}).catch(err=>{
console.log(`Error : ${err}`);

})
// Optional: Fetch data
Tour.find().then(data => {
  console.log("Tours data:", data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
