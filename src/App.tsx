import { useState } from "react";

import Dashboard from "./components/Dashboard";
import LoginPage from "./pages/LoginPage";

import { useAuth } from "./hooks/useAuth";

import {
  initialInventoryData,
  type InventoryItem,
} from "./data/inventorydata";

function App() {
  // Authentication
  const {
    isAuthenticated,
    username,
    logout,
  } = useAuth();

  // Inventory data
  const [items, setItems] =
    useState<InventoryItem[]>(
      initialInventoryData
    );

  // Search & Filter
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [status, setStatus] =
    useState("");

  // Add
  const [showAdd, setShowAdd] =
    useState(false);

  // Edit
  const [editingItem, setEditingItem] =
    useState<InventoryItem | null>(null);

  // View
  const [viewingItem, setViewingItem] =
    useState<InventoryItem | null>(null);

  // Delete
  const [deletingItem, setDeletingItem] =
    useState<InventoryItem | null>(null);

  // Get status
  const getStatus = (
    stock: number
  ) => {
    if (stock === 0) {
      return "Out of Stock";
    }

    if (stock <= 10) {
      return "Low Stock";
    }

    return "In Stock";
  };

  // Search & Filter
  const filteredItems =
    items.filter((item) => {

      const matchesSearch =
        item.itemName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.itemCode
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "" ||
        item.category === category;

      const matchesStatus =
        status === "" ||
        getStatus(
          item.stockQuantity
        ) === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });

  // CREATE
  const addItem = (
    item: InventoryItem
  ) => {
    setItems((prev) => [
      ...prev,
      item,
    ]);
  };

  // UPDATE
  const updateItem = (
    updatedItem: InventoryItem
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === updatedItem.id
          ? updatedItem
          : item
      )
    );
  };

  // DELETE
  const deleteItem = () => {

    if (!deletingItem) {
      return;
    }

    setItems((prev) =>
      prev.filter(
        (item) =>
          item.id !==
          deletingItem.id
      )
    );

    setDeletingItem(null);
  };

  // Login Page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Dashboard
  return (
    <Dashboard
      items={items}

      search={search}
      category={category}
      status={status}

      setSearch={setSearch}
      setCategory={setCategory}
      setStatus={setStatus}

      showAdd={showAdd}
      setShowAdd={setShowAdd}

      editingItem={editingItem}
      setEditingItem={setEditingItem}

      viewingItem={viewingItem}
      setViewingItem={setViewingItem}

      deletingItem={deletingItem}
      setDeletingItem={setDeletingItem}

      filteredItems={filteredItems}

      addItem={addItem}
      updateItem={updateItem}
      deleteItem={deleteItem}

      username={username ?? "Admin"}
      logout={logout}
    />
  );
}

export default App;