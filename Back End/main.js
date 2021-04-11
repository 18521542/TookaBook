var express = require("express");
var dotenv = require("dotenv");
var AccountApi = require("./Routes/AccountApi");
var bookRoutes = require("./Routes/bookRoutes");
var db = require("./Models/DatabaseAccessHelper");
const bodyParser = require("body-parser");
var notFound = require("./middleware/errorMiddleware");
var colors = require("colors");
//init server by express
var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//config port
dotenv.config();

//Connect Database
db.connect();

//hello express
app.get("/", function (req, res) {
  res.send("API is running...");
});

app.use("/api/books", bookRoutes);
AccountApi(app);

//app.use(notFound);
//Book
//BookApi(app)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `The server is running in development mode on port ${PORT}`.yellow.bold
  )
);
