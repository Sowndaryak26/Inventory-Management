function ItemDetails({ item, onClose }) {

  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-4 shadow-lg sm:p-6">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-gray-800">
            Item Details
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

        </div>

        {/* Details */}
        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500">
              Item Code
            </p>

            <p className="font-semibold text-gray-800">
              {item.itemCode}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Item Name
            </p>

            <p className="font-semibold text-gray-800">
              {item.itemName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Category
            </p>

            <p className="font-semibold text-gray-800">
              {item.category}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Stock Quantity
            </p>

            <p className="font-semibold text-gray-800">
              {item.stockQuantity}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Unit Price
            </p>

            <p className="font-semibold text-gray-800">
              ₹{item.unitPrice.toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Location
            </p>

            <p className="font-semibold text-gray-800">
              {item.location}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                item.status === "In Stock"
                  ? "bg-green-100 text-green-700"
                  : item.status === "Low Stock"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.status}
            </span>
          </div>

        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default ItemDetails;