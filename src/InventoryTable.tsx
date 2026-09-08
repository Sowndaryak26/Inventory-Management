import {
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import type { InventoryItem } from "./inventory";

interface Props {
  inventory: InventoryItem[];

  onEdit: (item: InventoryItem) => void;

  onDelete: (item: InventoryItem) => void;

  onView: (item: InventoryItem) => void;
}

function InventoryTable({
  inventory,
  onEdit,
  onDelete,
  onView,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-gray-50 border-b">

            <tr>

              <th className="text-left p-4 text-sm text-gray-600">
                Item Code
              </th>

              <th className="text-left p-4 text-sm text-gray-600">
                Item Name
              </th>

              <th className="text-left p-4 text-sm text-gray-600">
                Category
              </th>

              <th className="text-left p-4 text-sm text-gray-600">
                Quantity
              </th>

              <th className="text-left p-4 text-sm text-gray-600">
                Unit Price
              </th>

              <th className="text-left p-4 text-sm text-gray-600">
                Warehouse
              </th>

              <th className="text-left p-4 text-sm text-gray-600">
                Status
              </th>

              <th className="text-center p-4 text-sm text-gray-600">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {inventory.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 text-sm">
                  {item.itemCode}
                </td>

                <td className="p-4 font-medium">
                  {item.itemName}
                </td>

                <td className="p-4">
                  {item.category}
                </td>

                <td className="p-4">
                  {item.stockQuantity}
                </td>

                <td className="p-4">
                  ₹{item.unitPrice.toLocaleString("en-IN")}
                </td>

                <td className="p-4">
                  {item.warehouse}
                </td>

                <td className="p-4">

                  <Chip
                    label={item.status}
                    color={
                      item.status === "In Stock"
                        ? "success"
                        : item.status === "Low Stock"
                        ? "warning"
                        : "error"
                    }
                    size="small"
                  />

                </td>

                <td className="p-4 text-center">

                  <Tooltip title="View">

                    <IconButton
                      color="primary"
                      onClick={() => onView(item)}
                    >
                      <VisibilityIcon />
                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Edit">

                    <IconButton
                      color="primary"
                      onClick={() => onEdit(item)}
                    >
                      <EditIcon />
                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Delete">

                    <IconButton
                      color="error"
                      onClick={() => onDelete(item)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </Tooltip>

                </td>

              </tr>

            ))}

            {inventory.length === 0 && (

              <tr>

                <td
                  colSpan={8}
                  className="text-center p-8 text-gray-500"
                >
                  No inventory items found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default InventoryTable;