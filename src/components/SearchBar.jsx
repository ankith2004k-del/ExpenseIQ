function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="search-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </div>
  );
}

export default SearchBar;