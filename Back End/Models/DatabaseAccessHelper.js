//this is an area for database connection
var mysql = require("mysql");

//variable to check if db is connected or not
var connected = 0;

//config
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "BookStoreManagement",
});

//method of db
exports.connect = function () {
  if (connected == 1) {
    return;
  }
  connected = 1;
  connection.connect(function (err) {
    if (!err) {
      console.log("DB connected".cyan.underline);
    } else {
      console.log(`${err}`.red.underline);
    }
  });
};

exports.close = function () {
  connection.end(function (err) {
    if (!err) {
      console.log("DB close");
    }
  });
};

exports.getConnection = function () {
  return connection;
};

exports.executeQuerry = function (querryString){
  return new Promise((resolve, reject) => {
    connection.query(querryString, (err, rs)=>{
      if(err){
        reject(err)
      }
      if(rs){
        console.log("here1")
        resolve(rs)
      }
    })
  })
}
