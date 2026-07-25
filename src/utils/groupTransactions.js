import { getRelativeDate } from "./formatDate";

export function groupTransactions(transactions) {
  const grouped = {};

  transactions.forEach((transaction) => {
    const key = getRelativeDate(transaction.date);

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(transaction);
  });

  return grouped;
}