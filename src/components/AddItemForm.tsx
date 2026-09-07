import React, { useState } from "react";
import type { InventoryItem, InventoryStatus } from "../data/inventorydata";

type AddItemFormProps = {
  onClose: () => void;
  onAdd: (item: InventoryItem) => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ onClose, onAdd }) => {
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<InventoryStatus>("In Stock");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !itemCode ||
      !itemName ||
      !category ||
      !stockQuantity ||
      !unitPrice ||
      !location
    ) {
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now(),
      itemCode,
      itemName,
      category,
      stockQuantity: Number(stockQuantity),
      unitPrice: Number(unitPrice),
      location,
      status,
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#111827] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 bg-[#172033] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Add New Item
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Add a new inventory item to your stock
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-700 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Item Code */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Item Code
              </label>

              <input
                type="text"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
                placeholder="Example: IT011"
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Item Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Item Name
              </label>

              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Example: Laptop"
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="" className="bg-[#111827]">
                  Select Category
                </option>
                <option value="Electronics" className="bg-[#111827]">
                  Electronics
                </option>
                <option value="Accessories" className="bg-[#111827]">
                  Accessories
                </option>
                <option value="Furniture" className="bg-[#111827]">
                  Furniture
                </option>
              </select>
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Stock Quantity
              </label>

              <input
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Unit Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Unit Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full rounded-xl border border-slate-700 bg-[#0b1220] py-3 pl-9 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Warehouse / Location
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="" className="bg-[#111827]">
                  Select Warehouse
                </option>
                <option value="Chennai Warehouse" className="bg-[#111827]">
                  Chennai Warehouse
                </option>
                <option value="Bangalore Warehouse" className="bg-[#111827]">
                  Bangalore Warehouse
                </option>
                <option value="Coimbatore Warehouse" className="bg-[#111827]">
                  Coimbatore Warehouse
                </option>
              </select>
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as InventoryStatus)
                }
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="In Stock" className="bg-[#111827]">
                  In Stock
                </option>
                <option value="Low Stock" className="bg-[#111827]">
                  Low Stock
                </option>
                <option value="Out of Stock" className="bg-[#111827]">
                  Out of Stock
                </option>
              </select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-7 flex justify-end gap-3 border-t border-slate-700 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-600 bg-transparent px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Add Item
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;