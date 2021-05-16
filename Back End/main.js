var express = require("express");
require("dotenv").config();
var AccountApi = require("./Routes/AccountApi");
var BookApi = require("./Routes/bookRoutes");
var BillApi= require("./Routes/billRoutes");
var CustomerRoute = require("./Routes/CustomerRoute")
var db = require("./Models/DatabaseAccessHelper");
const bodyParser = require("body-parser");
var notFound = require("./middleware/errorMiddleware");
var colors = require("colors");
//init server by express
var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//config port

//Connect Database
db.connect();

app.get("/", function (req, res) {
  res.send("API is running...");
});

AccountApi(app);
BookApi(app);
BillApi(app);
CustomerRoute(app);

//Middleware
//app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `The server is running in development mode on port ${PORT}`.yellow.bold
  )
);
