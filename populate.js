//This is to dynamically add all product values to database

require("dotenv").config();

// need a second connection for the database
const connectDB = require("./db/connect");

// connect to the model
const Product = require("./models/product");

// pull the list of products from the products.json file
const jsonProducts = require("./products.json");

// connect to db and use model to add json products to db
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); // this allows the database to be cleared out if wanting to reuse this project, this is not needed and can commented out, if left in, when this is ran, all products will be deleted
    await Product.create(jsonProducts); // this pulls from the list in products.json to populate the list
    console.log("Success!");
    process.exit(0); // exits the file once successful
  } catch (error) {
    console.log(error);
    process.exit(1); // exits after error code is issued
  }
};

start();
