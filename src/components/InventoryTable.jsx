function InventoryTable({ items, onEdit, onView, onDelete }) {

  return (
    <div className="mt-6 rounded-xl bg-white shadow">

      {/* Table Header */}
      <div className="border-b p-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Inventory List
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          View and manage all inventory items
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

       <table className="w-full min-w-full text-left">

          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-5 py-4">Item Code</th>
              <th className="px-5 py-4">Item Name</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Quantity</th>
              <th className="px-5 py-4">Unit Price</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {items.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >

                {/* Item Code */}
                <td className="px-5 py-4 font-medium text-gray-800">
                  {item.itemCode}
                </td>

                {/* Item Name */}
                <td className="px-5 py-4 text-gray-700">
                  {item.itemName}
                </td>

                {/* Category */}
                <td className="px-5 py-4 text-gray-600">
                  {item.category}
                </td>

                {/* Quantity */}
                <td className="px-5 py-4 text-gray-700">
                  {item.stockQuantity}
                </td>

                {/* Price */}
                <td className="px-5 py-4 text-gray-700">
                  ₹{item.unitPrice.toLocaleString("en-IN")}
                </td>

                {/* Location */}
                <td className="px-5 py-4 text-gray-600">
                  {item.location}
                </td>

                {/* Status */}
                <td className="px-5 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                {/* Actions */}
                <td className="px-5 py-4">

                 <div className="flex gap-1 sm:gap-2">

              <button
  onClick={() => onView(item)}
  className="rounded-lg bg-blue-100 px-2 py-2 text-xs text-blue-700 hover:bg-blue-200 sm:px-3 sm:text-sm"
>
  View
</button>

 <button
  onClick={() => onEdit(item)}
  className="rounded-lg bg-yellow-100 px-2 py-2 text-xs text-yellow-700 hover:bg-yellow-200 sm:px-3 sm:text-sm"
>
  Edit
</button>

            <button
  onClick={() => onDelete(item)}
  className="rounded-lg bg-red-100 px-2 py-2 text-xs text-red-700 hover:bg-red-200 sm:px-3 sm:text-sm"
>
  Delete
</button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Empty Message */}
    {items.length === 0 && (
  <div className="p-10 text-center">
    <p className="text-lg font-semibold text-gray-700">
      No inventory items found
    </p>

    <p className="mt-1 text-sm text-gray-500">
      Try changing your search or filter.
    </p>
  </div>
)}

    </div>
  );
}

export default InventoryTable;