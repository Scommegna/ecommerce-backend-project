require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// Connects to mongodb
const connectDB = require("./db/connect");

// Error Middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ecommerce-api");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Starts application
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`app is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
