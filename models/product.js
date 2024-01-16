const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    // enum: ["Ikea", "liddy", "caressa", "marcos"], // this limits the company name that can be selected
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported", //   Updated way to write this with an error message to alert the user if the company in the above object is not on the list
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
