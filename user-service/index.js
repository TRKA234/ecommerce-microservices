const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "user-db",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "userdb",
  port: 5432,
});



// ================= HEALTH CHECK =================
app.get("/health", (req, res) => {
  res.json({ status: "user-service running" });
});

// ================= CREATE USER =================
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "name and email required" });
  }

  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );

  res.json(result.rows[0]);
});

// ================= READ USERS =================
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users ORDER BY id");
  res.json(result.rows);
});

// ================= UPDATE USER =================
app.put("/users/:id", async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "user not found" });
  }

  res.json(result.rows[0]);
});

// ================= DELETE USER =================
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [
    id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "user not found" });
  }

  res.json({ message: "user deleted" });
});

app.listen(3000, () => {
  console.log("User service listening on port 3000");
});

app.get("/db-check", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});

