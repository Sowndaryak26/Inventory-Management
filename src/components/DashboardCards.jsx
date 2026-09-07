function DashboardCards({ items }) {

  const totalItems = items.length;

  const lowStockItems = items.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const outOfStockItems = items.filter(
    (item) => item.status === "Out of Stock"
  ).length;

  const totalInventoryValue = items.reduce(
    (total, item) =>
      total + item.stockQuantity * item.unitPrice,
    0
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* Total Items */}
      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Total Items
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-800">
          {totalItems}
        </h2>
      </div>

      {/* Low Stock */}
      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Low Stock Items
        </p>

        <h2 className="mt-2 text-3xl font-bold text-yellow-600">
          {lowStockItems}
        </h2>
      </div>

      {/* Out of Stock */}
      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Out of Stock Items
        </p>

        <h2 className="mt-2 text-3xl font-bold text-red-600">
          {outOfStockItems}
        </h2>
      </div>

      {/* Inventory Value */}
      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">
          Total Inventory Value
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-600">
          ₹{totalInventoryValue.toLocaleString("en-IN")}
        </h2>
      </div>

    </div>
  );
}

export default DashboardCards;