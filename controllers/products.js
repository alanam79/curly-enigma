const Product = require("../models/product");

// testing controller
const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing async error");

  const products = await Product.find({}).sort("-name"); // whatever you put into the object is what will be searched, if left blank, will populate all products
  res.status(200).json({ products, nbHits: products.length });
};

// live controller
const getAllProducts = async (req, res) => {
  // console.log(req.query); testing to be sure the controller is working, using postmon to send a simple query, the results show in terminal
  const { featured, company, name } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  console.log(queryObject);

  const products = await Product.find(queryObject);

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
