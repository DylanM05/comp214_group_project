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

app.post('/api/NewOrderStatus', async (req, res) => {
  const { idStage, date, notes, shipper, shipNum } = req.body;
  try {
      await connection.execute(
          `BEGIN STATUS_SHIP_NEW(:p_idstage, :p_date, :p_notes, :p_shipper, :p_shipnum); END;`,
          {
              p_idstage: idStage,
              p_date: date,
              p_notes: notes,
              p_shipper: shipper,
              p_shipnum: shipNum
          }
      );
      res.send('Order status has been updated successfully.');
  } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).send('Internal Server Error');
  }
});



app.get('/api/get_all_baskets', async (req, res) => {
  try {
    const result = await connection.execute(
      `BEGIN GetAllBaskets(:cursor); END;`,
      { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
    );

    const resultSet = result.outBinds.cursor;
    let row;
    const rows = [];

    while ((row = await resultSet.getRow())) {
      rows.push(row);
    }

    await resultSet.close();

    res.json(rows);
  } catch (error) {
    console.error('Error fetching all baskets:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/calculate_tax', async (req, res) => {
  try {
    const { state_code, subtotal } = req.body;

    const result = await connection.execute(
      `BEGIN :ret := tax_cost_sp(:state_code, :subtotal); END;`,
      {
        ret: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        state_code: { dir: oracledb.BIND_IN, val: state_code, type: oracledb.STRING },
        subtotal: { dir: oracledb.BIND_IN, val: subtotal, type: oracledb.NUMBER }
      }
    );

    res.json({ tax_amount: result.outBinds.ret });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/api/checkProductSale/:productId/:date', async (req, res) => {
  try {
    const productId = req.params.productId;
    const date = req.params.date;

    const result = await connection.execute(
      `BEGIN :saleStatus := ck_sale_sf(:date, :productId); END;`,
      {
        saleStatus: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 15 },
        date: date,
        productId: productId
      }
    );

    const saleStatus = result.outBinds.saleStatus;
    res.json({ saleStatus });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/addNewProduct', async (req, res) => {
  const { productName, description, productImage, price, active } = req.body;
  try {
    await connection.execute(
      `BEGIN prod_add_sp(NULL, :p_productName, :p_description, :p_productImage, :p_price, :p_active); END;`,
      {
        p_productName: productName,
        p_description: description,
        p_productImage: productImage,
        p_price: price,
        p_active: active
      }
    );
    res.send('Product added successfully.');
  } catch (error) {
    console.error('Error adding new product:', error);
    res.status(500).send('Internal Server Error');
  }
});





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});