function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus
}) {
  return (
    <div className="mt-6 rounded-xl bg-white p-5 shadow">

      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Search & Filter
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Search */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Search
          </label>

          <input
            type="text"
            placeholder="Search item name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Stock Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

      </div>

    </div>
  );
}

export default SearchFilter;