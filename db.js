var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: '' // // Replace with your database Name
}); 
con.connect(function(err) {  
if (err) throw err;  
console.log("Connected!");  
con.query("CREATE DATABASE javatpoint", function (err, result) {  
if (err) throw err;  
console.log("Database created");  
});  


var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: '',      // Replace with your database password
  database: 'javatpoint' // // Replace with your database Name
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
  var sql = "CREATE TABLE contacts (f_name VARCHAR(255), l_name VARCHAR(255), email VARCHAR(255), created_at VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
module.exports = conn;