const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const transactionRoutes = require("./src/routes/transaction");
const balanceRoutes = require("./src/routes/balance");
const ethereumController= require("./src/controllers/ethereumPrice");
const CONSTANTS = require("./src/constants/common");
const interval = CONSTANTS.TIME_INTERVAL * CONSTANTS.SECOND * CONSTANTS.MILLISECOND;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/transaction", transactionRoutes);
app.use("/balance", balanceRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
   
    console.log("Connected to MongoDb via mongoose");
    app.listen(process.env.PORT);
    console.log(`Server started at port ${process.env.PORT}`);
  })
  .catch((err) => console.log(err));

setInterval(ethereumController.getEthereumPrice, interval);

