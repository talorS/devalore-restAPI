const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/usersRouter");
const cors = require('cors');

dotenv.config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// setup route paths
app.use("/", userRoute);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`===== Server is running on port ${process.env.PORT}! =====`);
});

module.exports = app;
