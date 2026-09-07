function Notification({ message, type, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed right-5 top-5 z-50 flex items-center gap-3 rounded-lg px-5 py-3 shadow-lg ${
        type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      <span>{message}</span>

      <button
        onClick={onClose}
        className="font-bold"
      >
        ✕
      </button>
    </div>
  );
}

export default Notification;