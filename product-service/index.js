const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

let db;

// ================= MYSQL CONNECT WITH RETRY =================
function connectWithRetry() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.error("MySQL not ready, retrying in 3s...", err.message);
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log("MySQL connected");
    }
  });
}

connectWithRetry();

// ================= HEALTH =================
app.get("/health", (req, res) => {
  res.json({ status: "product-service running" });
});

// ================= CREATE =================
app.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ message: "name & price required" });
  }

  db.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, name, price });
    }
  );
});

// ================= READ =================
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// ================= UPDATE =================
app.put("/products/:id", (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE products SET name=?, price=? WHERE id=?",
    [name, price, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "product not found" });
      }
      res.json({ message: "updated" });
    }
  );
});

// ================= DELETE =================
app.delete("/products/:id", (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "product not found" });
      }
      res.json({ message: "deleted" });
    }
  );
});

// ================= START SERVER =================
app.listen(3000, () => {
  console.log("Product service running on port 3000");
});

// ================= READ BY ID =================
app.get("/products/:id", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0)
        return res.status(404).json({ message: "product not found" });

      res.json(rows[0]);
    }
  );
});

// ================= READ BY ID =================
app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0)
        return res.status(404).json({ message: "product not found" });

      res.json(rows[0]);
    }
  );
});
