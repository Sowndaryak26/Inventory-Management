import { useState } from "react";

function ItemForm({ onAdd, onUpdate, onClose, editItem }) {

  const [itemCode, setItemCode] = useState(
    editItem ? editItem.itemCode : ""
  );

  const [itemName, setItemName] = useState(
    editItem ? editItem.itemName : ""
  );

  const [category, setCategory] = useState(
    editItem ? editItem.category : "Electronics"
  );

  const [stockQuantity, setStockQuantity] = useState(
    editItem ? editItem.stockQuantity : ""
  );

  const [unitPrice, setUnitPrice] = useState(
    editItem ? editItem.unitPrice : ""
  );

  const [location, setLocation] = useState(
    editItem ? editItem.location : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const quantity = Number(stockQuantity);

    let status = "In Stock";

    if (quantity === 0) {
      status = "Out of Stock";
    } else if (quantity <= 5) {
      status = "Low Stock";
    }

    const item = {
      id: editItem ? editItem.id : Date.now(),
      itemCode,
      itemName,
      category,
      stockQuantity: quantity,
      unitPrice: Number(unitPrice),
      location,
      status
    };

    if (editItem) {
      onUpdate(item);
    } else {
      onAdd(item);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-4 sm:p-6">

        {/* Title */}
        <h2 className="mb-5 text-2xl font-bold text-gray-800">
          {editItem ? "Edit Item" : "Add New Item"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Item Code */}
          <label className="mb-1 block text-sm font-medium">
            Item Code
          </label>

          <input
            type="text"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
            required
            className="mb-4 w-full rounded-lg border p-2"
          />

          {/* Item Name */}
          <label className="mb-1 block text-sm font-medium">
            Item Name
          </label>

          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="mb-4 w-full rounded-lg border p-2"
          />

          {/* Category */}
          <label className="mb-1 block text-sm font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-4 w-full rounded-lg border p-2"
          >
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Furniture</option>
            <option>Stationery</option>
          </select>

          {/* Quantity */}
          <label className="mb-1 block text-sm font-medium">
            Stock Quantity
          </label>

          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            min="0"
            required
            className="mb-4 w-full rounded-lg border p-2"
          />

          {/* Price */}
          <label className="mb-1 block text-sm font-medium">
            Unit Price
          </label>

          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            min="0"
            required
            className="mb-4 w-full rounded-lg border p-2"
          />

          {/* Location */}
          <label className="mb-1 block text-sm font-medium">
            Warehouse / Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mb-5 w-full rounded-lg border p-2"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white"
            >
              {editItem ? "Update Item" : "Add Item"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ItemForm;