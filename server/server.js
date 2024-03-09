const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/api/updateProductDescription', (req, res) => {
  const { productId, newDescription } = req.body;

  //To do: Update product description in database

  res.json({ message: `Product ${productId} updated with new description: ${newDescription}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
