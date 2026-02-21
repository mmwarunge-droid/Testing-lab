function Search({ searchTerm, onSearchChange, sortBy, onSortChange }) {
  return (
    <>
      <div className="ui large fluid icon input">
        <input
          type="text"
          placeholder="Search your Recent Transactions"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <i className="circular search link icon" />
      </div>

      <select
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