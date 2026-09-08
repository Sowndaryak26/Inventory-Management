import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";

import type {
  InventoryItem,
  StockStatus,
} from "./inventory";

interface Props {
  open: boolean;

  onClose: () => void;

  onSave: (
    item: Omit<InventoryItem, "id">
  ) => void;

  editItem: InventoryItem | null;
}

function InventoryForm({
  open,
  onClose,
  onSave,
  editItem,
}: Props) {

  const [formData, setFormData] =
    useState<Omit<InventoryItem, "id">>({
      itemCode: "",
      itemName: "",
      category: "",
      stockQuantity: 0,
      unitPrice: 0,
      warehouse: "",
      status: "In Stock",
    });

  useEffect(() => {

    if (editItem) {

      setFormData({
        itemCode: editItem.itemCode,
        itemName: editItem.itemName,
        category: editItem.category,
        stockQuantity: editItem.stockQuantity,
        unitPrice: editItem.unitPrice,
        warehouse: editItem.warehouse,
        status: editItem.status,
      });

    } else {

      setFormData({
        itemCode: "",
        itemName: "",
        category: "",
        stockQuantity: 0,
        unitPrice: 0,
        warehouse: "",
        status: "In Stock",
      });

    }

  }, [editItem, open]);

  const handleChange = (
    field: keyof Omit<InventoryItem, "id">,
    value: string | number
  ) => {

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

  };

  const handleSubmit = () => {

    if (
      !formData.itemCode ||
      !formData.itemName ||
      !formData.category ||
      !formData.warehouse
    ) {

      alert("Please fill all required fields");
      return;
    }

    onSave(formData);

  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        {editItem ? "Edit Inventory Item" : "Add New Item"}
      </DialogTitle>

      <DialogContent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">

          <TextField
            label="Item Code"
            value={formData.itemCode}
            onChange={(e) =>
              handleChange("itemCode", e.target.value)
            }
            required
          />

          <TextField
            label="Item Name"
            value={formData.itemName}
            onChange={(e) =>
              handleChange("itemName", e.target.value)
            }
            required
          />

          <TextField
            select
            label="Category"
            value={formData.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
            required
          >

            <MenuItem value="Electronics">
              Electronics
            </MenuItem>

            <MenuItem value="Accessories">
              Accessories
            </MenuItem>

            <MenuItem value="Furniture">
              Furniture
            </MenuItem>

          </TextField>

          <TextField
            label="Stock Quantity"
            type="number"
            value={formData.stockQuantity}
            onChange={(e) =>
              handleChange(
                "stockQuantity",
                Number(e.target.value)
              )
            }
          />

          <TextField
            label="Unit Price"
            type="number"
            value={formData.unitPrice}
            onChange={(e) =>
              handleChange(
                "unitPrice",
                Number(e.target.value)
              )
            }
          />

          <TextField
            label="Warehouse"
            value={formData.warehouse}
            onChange={(e) =>
              handleChange("warehouse", e.target.value)
            }
            required
          />

          <TextField
            select
            label="Stock Status"
            value={formData.status}
            onChange={(e) =>
              handleChange(
                "status",
                e.target.value as StockStatus
              )
            }
          >

            <MenuItem value="In Stock">
              In Stock
            </MenuItem>

            <MenuItem value="Low Stock">
              Low Stock
            </MenuItem>

            <MenuItem value="Out of Stock">
              Out of Stock
            </MenuItem>

          </TextField>

        </div>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {editItem ? "Update Item" : "Add Item"}
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default InventoryForm;