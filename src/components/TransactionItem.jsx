import { formatDate } from "../utils/formatDate";

function TransactionItem({
  transaction,
  editTransaction,
  deleteTransaction,
}) {
  return (
    <div className="transaction-card">
      <div className="transaction-header">

        <div className="transaction-info">
          <h3>{transaction.description}</h3>

          <p>
            {transaction.category} • {formatDate(transaction.date)}
          </p>
        </div>

        <div className="transaction-right">

          <span
            className={
              transaction.type === "Income"
                ? "income-text"
                : "expense-text"
            }
          >
            {transaction.type === "Income" ? "+" : "-"}₹
            {transaction.amount}
          </span>

          <div className="transaction-actions">

            <button
              className="action-btn edit-btn"
              onClick={() => editTransaction(transaction)}
            >
              Edit
            </button>

            <button
              className="action-btn delete-btn"
              onClick={() =>
                deleteTransaction(transaction.id)
              }
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default TransactionItem;