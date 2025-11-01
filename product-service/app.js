const express = require("express");
const app = express();

//Dummy Data Products
const products = [
  { id: 1, name: "Product A", price: 100, description: "This is Product A" },
  { id: 2, name: "Product B", price: 200, description: "This is Product B" },
  { id: 3, name: "Product C", price: 300, description: "This is Product C" },
  { id: 4, name: "Product D", price: 400, description: "This is Product D" },
  { id: 5, name: "Product E", price: 500, description: "This is Product E" },
];

//Endpoints to get all products
app.get("/products", (req, res) => {
  res.json(products);
});

//Endpoint to get product by id
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
  } else {
    res.json(product);
  }
});

//Start the server port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
