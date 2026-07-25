import { categories } from "../data/categories";

function FilterBar({
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="filter-bar">

      <select
        value={typeFilter}
        onChange={(e) =>
          setTypeFilter(e.target.value)
        }
      >
        <option value="All">
          All Types
        </option>

        <option value="Income">
          Income
        </option>

        <option value="Expense">
          Expense
        </option>
      </select>

      <select
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(e.target.value)
        }
      >
        <option value="All">
          All Categories
        </option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

    </div>
  );
}

export default FilterBar;