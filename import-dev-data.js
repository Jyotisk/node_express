const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require("./models/tourModel.js");

dotenv.config({ path: "./config.env" });

const tours = JSON.parse(fs.readFileSync("./tours-simple.json"));

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log("DB connection error:", err));




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});


// Define schema & model

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data imported successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("data deleted successfully");
    process.exit();

  } catch (error) {
    console.log(error);
    
  }
};

console.log(process.argv);
if(process.argv[2]==='--import'){
    importData()
}
if(process.argv[2]==='--delete'){
    deleteData()
}
