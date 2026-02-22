function Search({ searchTerm, onSearchChange, sortBy, onSortChange }) {
  return (
    <>
      <div className="ui large fluid icon input">
        {/* Label makes getByLabelText() possible in tests */}
        <label htmlFor="search" style={{ display: "none" }}>
          Search
        </label>

        <input
          id="search"
          aria-label="Search"
          type="text"
          placeholder="Search your Recent Transactions"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <i className="circular search link icon" />
      </div>

      {/* Label makes getByLabelText() possible in tests */}
      <label htmlFor="sort" style={{ display: "none" }}>
        Sort
      </label>

      <select
        id="sort"
        aria-label="Sort"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="description">Description</option>
        <option value="category">Category</option>
      </select>
    </>
  );
}

export default Search;