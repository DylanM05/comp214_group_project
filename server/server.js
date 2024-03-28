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

//I broke the code down here to explain how to use Cursors via Javascript
app.get('/api/idStatusOptions', async (req, res) => {
  try {
    let result;

    // Execute the stored procedure
    result = await connection.execute(
      `BEGIN GET_IDSTATUS_OPTIONS(:options); END;`,
      {
        options: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      }
    );

    // Retrieve the cursor from the result
    const cursor = result.outBinds.options;

    // Fetch all rows from the cursor
    const rows = await cursor.getRows();

    // Extract the IDSTATUS values from the rows
    const options = rows.map(row => row[0]);

    // Close the cursor
    await cursor.close();

    // Send the options as JSON response
    res.json(options);
  } catch (error) {
    console.error('Error fetching IDSTATUS options:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/updateorder', async (req, res) => {
  const { idstatus, idstage, date, notes, shipper, shipnum } = req.body; 
  try {
      await connection.execute(
          `BEGIN STATUS_SHIP_SP(:p_idstatus, :p_idstage, :p_date, :p_notes, :p_shipper, :p_shipnum); END;`,
          {
              p_idstatus: idstatus,
              p_idstage: idstage,
              p_date: date,
              p_notes: notes,
              p_shipper: shipper,
              p_shipnum: shipnum
          }
      );
      res.send('Order Status has been updated successfully.');
  } catch (error) {
      console.error('Error updating shipping:', error);
      res.status(500).send('Internal Server Error');
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});