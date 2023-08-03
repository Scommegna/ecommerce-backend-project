require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// Routes
const authRouter = require("./routes/auth");

// other packages
const morgan = require("morgan");

// Connects to mongodb
const connectDB = require("./db/connect");

// Error Middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ecommerce-api");
});

app.use("/api/v1/auth", authRouter);

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
