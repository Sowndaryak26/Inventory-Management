import type { InventoryItem } from "../data/inventorydata";

type DeleteDialogProps = {
  item: InventoryItem;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteDialog({
  item,
  onClose,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        
        <h2 className="mb-3 text-xl font-semibold text-gray-800">
          Delete Item
        </h2>

        <p className="mb-6 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">
            {item.itemName}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteDialog;