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

  onConfirm: () => void;
}

function DeleteDialog({
  open,
  item,
  onClose,
  onConfirm,
}: Props) {

  return (

    <Dialog
      open={open}
      onClose={onClose}
    >

      <DialogTitle>
        Delete Inventory Item
      </DialogTitle>

      <DialogContent>

        Are you sure you want to delete{" "}

        <strong>
          {item?.itemName}
        </strong>

        ?

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default DeleteDialog;