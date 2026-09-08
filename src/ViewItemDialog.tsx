import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import type { InventoryItem } from "./inventory";

interface Props {
  open: boolean;
  item: InventoryItem | null;
  onClose: () => void;
}

function ViewItemDialog({
  open,
  item,
  onClose,
}: Props) {

  if (!item) return null;

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        Inventory Item Details
      </DialogTitle>

      <DialogContent>

        <div className="grid grid-cols-2 gap-4 mt-3">

          <p>
            <strong>Item Code:</strong>
            <br />
            {item.itemCode}
          </p>

          <p>
            <strong>Item Name:</strong>
            <br />
            {item.itemName}
          </p>

          <p>
            <strong>Category:</strong>
            <br />
            {item.category}
          </p>

          <p>
            <strong>Stock Quantity:</strong>
            <br />
            {item.stockQuantity}
          </p>

          <p>
            <strong>Unit Price:</strong>
            <br />
            ₹{item.unitPrice.toLocaleString("en-IN")}
          </p>

          <p>
            <strong>Warehouse:</strong>
            <br />
            {item.warehouse}
          </p>

          <p>
            <strong>Status:</strong>
            <br />
            {item.status}
          </p>

        </div>

      </DialogContent>

      <DialogActions>

        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default ViewItemDialog;