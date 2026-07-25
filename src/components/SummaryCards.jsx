function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="summary-grid">
      <div className="summary-card balance">
        <h3>Balance</h3>
        <p>₹{balance.toLocaleString()}</p>
      </div>

      <div className="summary-card income">
        <h3>Income</h3>
        <p>₹{income.toLocaleString()}</p>
      </div>

      <div className="summary-card expense">
        <h3>Expense</h3>
        <p>₹{expense.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default SummaryCards;