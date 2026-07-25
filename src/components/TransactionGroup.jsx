import TransactionItem from "./TransactionItem";

function TransactionGroup({
  title,
  transactions,
  editTransaction,
  deleteTransaction,
}) {
  return (
    <div className="transaction-group">

      <h3 className="group-title">
        {title}
      </h3>

      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          editTransaction={editTransaction}
          deleteTransaction={deleteTransaction}
        />
      ))}

    </div>
  );
}

export default TransactionGroup;