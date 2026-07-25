const pool = require("../config/db");

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions ORDER BY date DESC, id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Add transaction
const addTransaction = async (req, res) => {
  try {
    const { description, amount, type, category, date } = req.body;

    const result = await pool.query(
      `INSERT INTO transactions
      (description, amount, type, category, date)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [description, amount, type, category, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type, category, date } = req.body;

    const result = await pool.query(
      `UPDATE transactions
       SET description=$1,
           amount=$2,
           type=$3,
           category=$4,
           date=$5
       WHERE id=$6
       RETURNING *`,
      [description, amount, type, category, date, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM transactions WHERE id=$1",
      [id]
    );

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};