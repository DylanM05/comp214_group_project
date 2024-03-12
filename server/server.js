var express = require('express');
var app = express();
var mysql = require('mysql');

// Create a connection to your database
var con = mysql.createConnection({
  host: "oracle1.centennialcollege.ca",
  user: "COMP214_W24_ers_3",
  password: "######",// Replace with password once new one is recieved
  database: "Dylan_Comp214_Winter24"
});

// Connect to the database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

// Create a route to handle the POST request
app.post('/api/updateProductDescription', function (req, res) {
  var id = req.body.productId;
  var newDescription = req.body.newDescription;
  var sql = "UPDATE products SET description = ? WHERE id = ?";
  
  con.query(sql, [newDescription, id], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send(result);
  });
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});