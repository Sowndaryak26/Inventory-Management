import { useEffect, useState } from "react";
import inventoryData from "./data/inventoryData";

import DashboardCards from "./components/DashboardCards";
import InventoryTable from "./components/InventoryTable";
import SearchFilter from "./components/SearchFilter";
import ItemForm from "./components/ItemForm";
import ItemDetails from "./components/ItemDetails";
import DeleteModal from "./components/DeleteModal";
import Notification from "./components/Notification";

function App() {

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("inventoryItems");

    if (savedItems) {
      return JSON.parse(savedItems);
    }

    return inventoryData;
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [notification, setNotification] = useState({
  message: "",
  type: "success"
});

const showNotification = (message, type = "success") => {
  setNotification({
    message,
    type
  });

  setTimeout(() => {
    setNotification({
      message: "",
      type: "success"
    });
  }, 3000);
};

  const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 3;


  // Save inventory data to localStorage
  useEffect(() => {
    localStorage.setItem(
      "inventoryItems",
      JSON.stringify(items)
    );
  }, [items]);


  // Add item
const handleAddItem = (newItem) => {
  setItems([...items, newItem]);
  setShowForm(false);

  showNotification("Item added successfully!");
};


  // Edit item
  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };


  // Update item
 const handleUpdateItem = (updatedItem) => {

  const updatedItems = items.map((item) =>
    item.id === updatedItem.id
      ? updatedItem
      : item
  );

  setItems(updatedItems);
  setShowForm(false);
  setEditItem(null);

  showNotification("Item updated successfully!");
};


  // Delete item
 const handleDelete = (id) => {

  const updatedItems = items.filter(
    (item) => item.id !== id
  );

  setItems(updatedItems);
  setDeleteItem(null);

  showNotification("Item deleted successfully!");
};


  // Search and filter
  const filteredItems = items.filter((item) => {

    const searchMatch =
      item.itemName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.itemCode
        .toLowerCase()
        .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      item.category === category;

    const statusMatch =
      status === "All" ||
      item.status === status;

    return (
      searchMatch &&
      categoryMatch &&
      statusMatch
    );
  });

  const totalPages = Math.ceil(
  filteredItems.length / itemsPerPage
);

useEffect(() => {
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }
}, [currentPage, totalPages]);

const startIndex =
  (currentPage - 1) * itemsPerPage;

const paginatedItems = filteredItems.slice(
  startIndex,
  startIndex + itemsPerPage
);


  return (
    <div className="min-h-screen bg-gray-100">
      <Notification
  message={notification.message}
  type={notification.type}
  onClose={() =>
    setNotification({
      message: "",
      type: "success"
    })
  }
/>

      {/* Header */}
     <header className="bg-white px-4 py-5 shadow sm:px-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              Inventory Management
            </h1>

           <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Manage your inventory items easily
            </p>
          </div>


      <button
  onClick={() => {
    setEditItem(null);
    setShowForm(true);
  }}
  className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700"
>
  + Add New Item
</button>

        </div>

      </header>


      {/* Main */}
      <main className="p-4 sm:p-6">

       <div className="mb-4">
  <h2 className="text-xl font-semibold text-gray-800">
    Dashboard
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Overview of your inventory
  </p>
</div>


        {/* Dashboard */}
        <DashboardCards items={items} />


        {/* Search and Filter */}
    <SearchFilter
  search={search}
  setSearch={(value) => {
    setSearch(value);
    setCurrentPage(1);
  }}
  category={category}
  setCategory={(value) => {
    setCategory(value);
    setCurrentPage(1);
  }}
  status={status}
  setStatus={(value) => {
    setStatus(value);
    setCurrentPage(1);
  }}
/>

<div className="mt-6 mb-3 flex items-center justify-between">
  <p className="text-sm text-gray-500">
    Showing {paginatedItems.length} of {filteredItems.length} items
  </p>
</div>

        {/* Inventory Table */}
   <InventoryTable
  items={paginatedItems}
  onEdit={handleEdit}
  onView={setViewItem}
  onDelete={setDeleteItem}
/>

{totalPages > 1 && (
<div className="mt-4 flex flex-wrap items-center justify-center gap-2">

    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="rounded-lg border bg-white px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Previous
    </button>

    {Array.from(
      { length: totalPages },
      (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`rounded-lg px-4 py-2 ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "border bg-white text-gray-700"
          }`}
        >
          {index + 1}
        </button>
      )
    )}

    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="rounded-lg border bg-white px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Next
    </button>

  </div>
)}

      </main>


      {/* Add / Edit Form */}
      {showForm && (
        <ItemForm
          editItem={editItem}
          onAdd={handleAddItem}
          onUpdate={handleUpdateItem}
          onClose={() => {
            setShowForm(false);
            setEditItem(null);
          }}
        />
      )}


      {/* View Details */}
      {viewItem && (
        <ItemDetails
          item={viewItem}
          onClose={() => setViewItem(null)}
        />
      )}


      {/* Delete Confirmation */}
      {deleteItem && (
        <DeleteModal
          item={deleteItem}
          onDelete={handleDelete}
          onClose={() => setDeleteItem(null)}
        />
      )}

    </div>
  );
}

export default App;