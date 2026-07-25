import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import TransactionList from "../components/TransactionList";

import { categories } from "../data/categories";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState(categories[0]);

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Reset Form
  // ==========================

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setType("Expense");
    setCategory(categories[0]);
    setDate(new Date().toISOString().split("T")[0]);
    setEditingId(null);
  };

  // ==========================
  // Add / Update Transaction
  // ==========================

  const addTransaction = async (e) => {
    e.preventDefault();

    if (!description.trim() || !amount || !date) {
      alert("Please fill all fields.");
      return;
    }

    const transaction = {
      description: description.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    };

    try {
      if (editingId !== null) {
        await api.put(`/transactions/${editingId}`, transaction);
      } else {
        await api.post("/transactions", transaction);
      }

      await fetchTransactions();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Edit Transaction
  // ==========================

  const editTransaction = (transaction) => {
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setType(transaction.type);
    setCategory(transaction.category);
    setDate(transaction.date);
    setEditingId(transaction.id);
  };

  // ==========================
  // Delete Transaction
  // ==========================

  const deleteTransaction = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/transactions/${id}`);
      await fetchTransactions();

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Cancel Editing
  // ==========================

  const cancelEdit = () => {
    resetForm();
  };
    // ==========================
  // Dashboard Summary
  // ==========================

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  const balance = income - expense;

  return (
    <div className="dashboard">

      {/* Summary Cards */}
      <SummaryCards
        transactions={transactions}
        income={income}
        expense={expense}
        balance={balance}
      />

      {/* Summary Page Link */}
      <div className="summary-link-card">
        <div className="summary-link-content">
          <h3>📊 Financial Summary</h3>
          <p>
            View your overall balance, monthly reports,
            income, expenses and future analytics.
          </p>
        </div>

        <Link
          to="/summary"
          className="summary-btn"
        >
          View Summary →
        </Link>
      </div>

      {/* Transaction Form */}
      <section className="dashboard-section">
        <h2 className="section-title">
          {editingId !== null ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <TransactionForm
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          categories={categories}
          date={date}
          setDate={setDate}
          addTransaction={addTransaction}
          editingId={editingId}
          cancelEdit={cancelEdit}
        />
      </section>

      {/* Search */}
      <section className="dashboard-section">
        <h2 className="section-title">
          Search Transactions
        </h2>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </section>

      {/* Filters */}
      <section className="dashboard-section">
        <h2 className="section-title">
          Filters
        </h2>

        <FilterBar
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </section>

      {/* Transaction History */}
      <section className="dashboard-section">
        <div className="history-header">
          <h2 className="section-title">
            Transaction History
          </h2>

          <span className="transaction-count">
            {transactions.length} Transaction
            {transactions.length !== 1 ? "s" : ""}
          </span>
        </div>

        <TransactionList
          transactions={transactions}
          editTransaction={editTransaction}
          deleteTransaction={deleteTransaction}
          search={search}
          typeFilter={typeFilter}
          categoryFilter={categoryFilter}
        />
      </section>

    </div>
  );
}

export default Dashboard;