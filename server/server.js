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
  var IDPRODUCT = req.body.IDPRODUCT;
  var Description = req.body.DESCRIPTION;

  var sql = `
  BEGIN
    UpdateProductDescription(:1, :2);
  END;
`;

try {
  const result = await connection.execute(
    sql,
    [IDPRODUCT, Description],
    { autoCommit: true }
  );

    console.log(`idProduct: ${IDPRODUCT}, Description: ${Description}`);
    console.log(result.rowsAffected + " record(s) updated");
    res.json({ rowsAffected: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get('/api/getProductidname', async (req, res) => {
  try {
    const result = await connection.execute(
      `BEGIN getProductidname(:cursor); END;`,
      {
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      }
    );

    const resultSet = result.outBinds.cursor;
    let row;
    let rows = [];

    while ((row = await resultSet.getRow())) {
      rows.push(row);
    }

    await resultSet.close();

    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});