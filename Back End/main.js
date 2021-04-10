var express = require("express");
var dotenv = require("dotenv");
var AccountApi = require("./Routes/AccountApi");
var bookRoutes = require("./Routes/bookRoutes");
var colors = require("colors");
//init server by express
var app = express();

//config port
dotenv.config();


//hello express
app.get("/", function (req, res) {
  res.send("API is running...");
});


app.use("/api/books", bookRoutes);
AccountApi(app);

//Book
//BookApi(app)


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `The server is running in development mode on port ${PORT}`.yellow.bold
  )
);
