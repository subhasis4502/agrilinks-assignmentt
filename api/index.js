const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const comodityRoute = require("./routes/comodities");

dotenv.config();

//Connecting to our database
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to Database");
    }
  );

//Middleware
app.use(express.json());
app.use(morgan("common"));

app.use("/api/comodities", comodityRoute);

app.listen(8800, () => {
    console.log("Server is running on port 8800");
});
