require("dotenv").config();

// async errors
require("express-async-errors");

const express = require("express");
const app = express();

// invoking mongo db
const connectDB = require("./db/connect");

// invoking product router
const productsRouter = require("./routes/products");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// This middleware parses the JSON data in the request body and makes it available in req.body for further processing in your route handlers
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

app.use("/api/v1/products", productsRouter);

// products route

// middleware functions that are executed for every incoming request, must come right after app.get
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// dynamic port
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect to DB in the future here
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is now listening to ${port} 🚀`));
  } catch (error) {
    console.log(error);
  }
};

start();
