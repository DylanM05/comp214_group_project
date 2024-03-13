var express = require('express');
var cors = require('cors');
var app = express();
var oracledb = require('oracledb');
require('dotenv').config();
app.use(cors());

let connection;

async function run() {
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SID}`
    });

    console.log('Successfully connected to Oracle!');
  } catch (err) {
    console.error(err);
  }
}

run();

// Use express.json() middleware to parse JSON bodies
app.use(express.json());
// Create a route to handle the POST request
app.post('/api/updateProductDescription', cors(), async (req, res) => {
  var idProduct = req.body.IDPRODUCT;
  var newDescription = req.body.DESCRIPTION;  
  var sql = "UPDATE BB_product SET DESCRIPTION = :1 WHERE IDPRODUCT = :2";

  try {
    const result = await connection.execute(sql, [newDescription, idProduct], { autoCommit: true });
    console.log(result.rowsAffected + " record(s) updated");
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});