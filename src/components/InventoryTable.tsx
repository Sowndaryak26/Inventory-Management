import React from "react";
import {
  Edit,
  Delete,
  Visibility,
  Inventory2,
} from "@mui/icons-material";

import type { InventoryItem } from "../data/inventorydata";

type InventoryTableProps = {
  items: InventoryItem[];

  onEdit?: (item: InventoryItem) => void;
  onView?: (item: InventoryItem) => void;
  onDelete?: (item: InventoryItem) => void;
};

const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  onEdit,
  onView,
  onDelete,
}) => {
  // Status style
  const getStatusStyle = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return {
          badge:
            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
          dot: "bg-emerald-400",
        };

      case "Low Stock":
        return {
          badge:
            "bg-amber-500/10 text-amber-400 border border-amber-500/20",
          dot: "bg-amber-400",
        };

      case "Out of Stock":
        return {
          badge:
            "bg-red-500/10 text-red-400 border border-red-500/20",
          dot: "bg-red-400",
        };

      default:
        return {
          badge:
            "bg-slate-500/10 text-slate-400 border border-slate-500/20",
          dot: "bg-slate-400",
        };
    }
  };

  // Currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-[#111a2b] shadow-xl">

      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Inventory List
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage and monitor your inventory items
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[#172338] px-3 py-2">
          <Inventory2 className="text-[#94a3b8]" fontSize="small" />

          <span className="text-sm font-medium text-slate-300">
            {items.length} Items
          </span>
        </div>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center px-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#172338]">
            <Inventory2 className="text-slate-500" fontSize="large" />
          </div>

          <h3 className="text-lg font-medium text-white">
            No inventory items found
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Try changing your search or filter options.
          </p>
        </div>
      ) : (
        /* Table */
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">

            {/* Table Head */}
            <thead>
              <tr className="border-b border-slate-700/60 bg-[#0d1524]">

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  #
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Item
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Stock
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Unit Price
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Location
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Actions
                </th>

              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {items.map((item, index) => {
                const statusStyle = getStatusStyle(item.status);

                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-700/40 transition-colors duration-200 hover:bg-[#172338]"
                  >

                    {/* Number */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-500">
                        {index + 1}
                      </span>
                    </td>

                    {/* Item */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1d2d48]">
                          <Inventory2 className="text-[#60a5fa]" />
                        </div>

                        <div>
                          <p className="font-medium text-white">
                            {item.itemName}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {item.itemCode}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-[#172338] px-3 py-1.5 text-sm text-slate-300">
                        {item.category}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">

                        <span
                          className={`text-sm font-semibold ${
                            item.stockQuantity === 0
                              ? "text-red-400"
                              : item.stockQuantity <= 10
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {item.stockQuantity}
                        </span>

                        <span className="text-xs text-slate-500">
                          units
                        </span>

                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-slate-200">
                        {formatPrice(item.unitPrice)}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">

                        <span className="text-sm text-slate-300">
                          {item.location}
                        </span>

                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle.badge}`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
                        />

                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">

                        {/* View */}
                        <button
                          type="button"
                          onClick={() => onView?.(item)}
                          title="View item"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#172338] text-slate-400 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
                        >
                          <Visibility fontSize="small" />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => onEdit?.(item)}
                          title="Edit item"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#172338] text-slate-400 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400"
                        >
                          <Edit fontSize="small" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => onDelete?.(item)}
                          title="Delete item"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#172338] text-slate-400 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Delete fontSize="small" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      {items.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-700/60 bg-[#0d1524] px-6 py-4">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-300">
              {items.length}
            </span>{" "}
            inventory items
          </p>

          <div className="text-xs text-slate-500">
            Inventory Management
          </div>

        </div>
      )}
    </div>
  );
};

export default InventoryTable;