const express = require("express");
const dotenv = require("dotenv");
const petsRoute = require("./routes/petsRouter");
const cors = require('cors');

//------------------------Pets WS Server------------------------------------------//
dotenv.config();
var db = require('./configs/petsDatabase');
var app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Allowing get requests (access) from any unknown domains 
app.use(cors());

// setup route path
app.use("/api", petsRoute);

// listen for requests
var server = app.listen(process.env.PORT, () => {
  console.log(`===== Server is running on port ${process.env.PORT}! =====`);
});

process.once('SIGTERM', async () => {
  await db.dbDisconnect();
  server.close(() => {
    console.log('===== Server closed =====')
    process.exit(0);
  });
});

module.exports = app;
