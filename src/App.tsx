import { useState } from "react";

import {
  Snackbar,
  Alert,
  Pagination,
} from "@mui/material";

import Header from "./Header";
import DashboardCards from "./DashboardCard";
import SearchFilter from "./SearchFilter";
import InventoryTable from "./InventoryTable";
import InventoryForm from "./InventoryForm";
import DeleteDialog from "./DeleteDialog";
import ViewItemDialog from "./ViewItemDialog";

import { initialInventory } from "./inventoryData";

import type {
  InventoryItem,
  StockStatus,
} from "./inventory";

function App() {

  const [inventory, setInventory] =
    useState<InventoryItem[]>(initialInventory);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [editItem, setEditItem] =
    useState<InventoryItem | null>(null);

  const [deleteItem, setDeleteItem] =
    useState<InventoryItem | null>(null);

  const [viewItem, setViewItem] =
    useState<InventoryItem | null>(null);

  const [message, setMessage] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  // SEARCH + FILTER

  const filteredInventory =
    inventory.filter((item) => {

      const searchMatch =
        item.itemName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        item.itemCode
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "" ||
        item.category === category;

      const statusMatch =
        status === "" ||
        item.status === status;

      return (
        searchMatch &&
        categoryMatch &&
        statusMatch
      );

    });


  // PAGINATION

  const totalPages =
    Math.ceil(
      filteredInventory.length /
      itemsPerPage
    ) || 1;

  const paginatedInventory =
    filteredInventory.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage *
        itemsPerPage
    );


  // ADD / UPDATE

  const handleSave = (
    itemData: Omit<InventoryItem, "id">
  ) => {

    if (editItem) {

      setInventory((prev) =>
        prev.map((item) =>
          item.id === editItem.id
            ? {
                ...itemData,
                id: editItem.id,
              }
            : item
        )
      );

      setMessage("Item updated successfully");

    } else {

      const newItem: InventoryItem = {

        ...itemData,

        id:
          inventory.length > 0
            ? Math.max(
                ...inventory.map(
                  (item) => item.id
                )
              ) + 1
            : 1,

      };

      setInventory((prev) => [
        ...prev,
        newItem,
      ]);

      setMessage("Item added successfully");

    }

    setFormOpen(false);
    setEditItem(null);

  };


  // EDIT

  const handleEdit = (
    item: InventoryItem
  ) => {

    setEditItem(item);

    setFormOpen(true);

  };


  // DELETE

  const handleDelete = () => {

    if (!deleteItem) return;

    setInventory((prev) =>
      prev.filter(
        (item) =>
          item.id !== deleteItem.id
      )
    );

    setMessage("Item deleted successfully");

    setDeleteItem(null);

  };


  // ADD BUTTON

  const handleAdd = () => {

    setEditItem(null);

    setFormOpen(true);

  };


  return (

    <div className="min-h-screen bg-gray-100">

      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        <DashboardCards
          inventory={inventory}
        />

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
          onAdd={handleAdd}
        />

        <InventoryTable
          inventory={paginatedInventory}
          onEdit={handleEdit}
          onDelete={setDeleteItem}
          onView={setViewItem}
        />

        

        <div className="flex justify-center mt-6">

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) =>
              setCurrentPage(page)
            }
            color="primary"
          />

        </div>

      </main>


      

      <InventoryForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditItem(null);
        }}
        onSave={handleSave}
        editItem={editItem}
      />


      

      <DeleteDialog
        open={Boolean(deleteItem)}
        item={deleteItem}
        onClose={() =>
          setDeleteItem(null)
        }
        onConfirm={handleDelete}
      />


      

      <ViewItemDialog
        open={Boolean(viewItem)}
        item={viewItem}
        onClose={() =>
          setViewItem(null)
        }
      />


      

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
      >

        <Alert
          severity="success"
          variant="filled"
          onClose={() => setMessage("")}
        >

          {message}

        </Alert>

      </Snackbar>

    </div>
  );
}

export default App;