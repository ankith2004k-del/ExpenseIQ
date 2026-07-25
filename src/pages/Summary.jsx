import { useMemo, useState } from "react";
import Header from "../components/Header";

function Summary() {
  const transactions = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );

  const currentMonth = new Date().toISOString().slice(0, 7);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const monthlyTransactions = useMemo(() => {
    return transactions.filter(
      (t) => t.date && t.date.slice(0, 7) === selectedMonth
    );
  }, [transactions, selectedMonth]);

  // Overall
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  // Monthly
  const monthIncome = monthlyTransactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthExpense = monthlyTransactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthBalance = monthIncome - monthExpense;

  return (
    <div className="container">
      <Header />

      <h2>Financial Summary</h2>

      <div className="month-selector">
        <label>Select Month:</label>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <h3>Monthly Summary</h3>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Balance</h3>
          <h2>₹{monthBalance.toFixed(2)}</h2>
        </div>

        <div className="summary-card income">
          <h3>Income</h3>
          <h2>₹{monthIncome.toFixed(2)}</h2>
        </div>

        <div className="summary-card expense">
          <h3>Expense</h3>
          <h2>₹{monthExpense.toFixed(2)}</h2>
        </div>
      </div>

      <h3 style={{ marginTop: "40px" }}>Overall Summary</h3>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Balance</h3>
          <h2>₹{totalBalance.toFixed(2)}</h2>
        </div>

        <div className="summary-card income">
          <h3>Income</h3>
          <h2>₹{totalIncome.toFixed(2)}</h2>
        </div>

        <div className="summary-card expense">
          <h3>Expense</h3>
          <h2>₹{totalExpense.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Summary;