import TransactionGroup from "./TransactionGroup";
import { groupTransactions } from "../utils/groupTransactions";

function TransactionList({
  transactions,
  editTransaction,
  deleteTransaction,
  search,
  typeFilter,
  categoryFilter,
}) {
  // ==========================
  // Search
  // ==========================
  let filteredTransactions = transactions.filter((transaction) =>
    transaction.description
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ==========================
  // Type Filter
  // ==========================
  if (typeFilter !== "All") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.type === typeFilter
    );
  }

  // ==========================
  // Category Filter
  // ==========================
  if (categoryFilter !== "All") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) =>
        transaction.category === categoryFilter
    );
  }

  // ==========================
  // Sort Latest First
  // ==========================
  filteredTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // ==========================
  // Group by Date
  // ==========================
  const groupedTransactions = groupTransactions(
    filteredTransactions
  );

  return (
    <div className="transaction-list">
      <h2>Transaction History</h2>

      {Object.keys(groupedTransactions).length === 0 ? (
        <p className="no-transactions">
          No transactions found.
        </p>
      ) : (
        Object.entries(groupedTransactions).map(
          ([title, items]) => (
            <TransactionGroup
              key={title}
              title={title}
              transactions={items}
              editTransaction={editTransaction}
              deleteTransaction={deleteTransaction}
            />
          )
        )
      )}
    </div>
  );
}

export default TransactionList;