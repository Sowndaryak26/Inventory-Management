function DeleteModal({ item, onDelete, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
 <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-lg sm:p-6">

        <h2 className="text-xl font-bold text-gray-800">
          Delete Item
        </h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to delete
          <span className="font-semibold"> {item.itemName}</span>?
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeleteModal;