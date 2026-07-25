function TransactionForm({
  description,
  setDescription,
  amount,
  setAmount,
  type,
  setType,
  category,
  setCategory,
  categories,
  date,
  setDate,
  addTransaction,
  editingId,
  cancelEdit,
}) {
  return (
    <section className="transaction-form">
      <h2>
        {editingId !== null
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      <form onSubmit={addTransaction}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className="primary-btn"
        >
          {editingId !== null
            ? "Update Transaction"
            : "Add Transaction"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            className="secondary-btn"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
    </section>
  );
}

export default TransactionForm;