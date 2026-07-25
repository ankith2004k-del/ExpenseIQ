require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const transactionRoutes = require("./routes/transactions");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/transactions", transactionRoutes);

// Neon PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test database connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "ExpenseIQ Backend Connected!",
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database connection failed",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});