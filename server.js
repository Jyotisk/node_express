const mongodb=require('mongodb')
const dotenv=require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config({path:'./config.env'})
const app =require('./app');
//for server
// const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
// for local
const DB=process.env.MONGO_URI

// mongodb.connect(DB,{
//   useNewUrlParser:true,
//   useCreateIndex:true,
//   useFindAndModify:false
// }).then(con=>{
//   console.log(con.connection);
//   console.log("db connected successfull");
  
  
// });


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(DB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("natours-test").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // View db data in console
    const tours = await client.db("natours-test").collection("tours").find({}).toArray();
    console.log("Tours data:", tours);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});


