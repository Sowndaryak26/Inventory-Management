import type { Dispatch, SetStateAction } from "react";

import Header from "./Header";
import Sidebar from "./sidebar";
import DashboardCards from "./DashboardCards";
import SearchFilter from "./SearchFilter";
import InventoryTable from "./InventoryTable";
import AddItemForm from "./AddItemForm";
import EditItemForm from "./EditItemForm";
import ItemDetails from "./ItemDetails";
import DeleteDialog from "./DeleteDialog";

import type { InventoryItem } from "../data/inventorydata";

type DashboardProps = {
  items: InventoryItem[];

  search: string;
  category: string;
  status: string;

  setSearch: Dispatch<SetStateAction<string>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;

  showAdd: boolean;
  setShowAdd: Dispatch<SetStateAction<boolean>>;

  editingItem: InventoryItem | null;
  setEditingItem: Dispatch<
    SetStateAction<InventoryItem | null>
  >;

  viewingItem: InventoryItem | null;
  setViewingItem: Dispatch<
    SetStateAction<InventoryItem | null>
  >;

  deletingItem: InventoryItem | null;
  setDeletingItem: Dispatch<
    SetStateAction<InventoryItem | null>
  >;

  filteredItems: InventoryItem[];

  addItem: (item: InventoryItem) => void;

  updateItem: (item: InventoryItem) => void;

  deleteItem: () => void;

  username: string;

  logout: () => void;
};

function Dashboard({
  items,

  search,
  category,
  status,

  setSearch,
  setCategory,
  setStatus,

  showAdd,
  setShowAdd,

  editingItem,
  setEditingItem,

  viewingItem,
  setViewingItem,

  deletingItem,
  setDeletingItem,

  filteredItems,

  addItem,
  updateItem,
  deleteItem,

  username,
  logout,
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      
      {/* ================= HEADER ================= */}

      <Header
        username={username}
        onLogout={logout}
      />

      <div className="flex">

        {/* ================= SIDEBAR ================= */}

        <aside className="hidden lg:block w-64 min-h-[calc(100vh-72px)] bg-[#111a2b] border-r border-slate-800">
          <Sidebar />
        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <main className="flex-1 min-w-0">

          <div className="p-4 md:p-6 lg:p-8">

            {/* ================= PAGE HEADER ================= */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

              <div>
                <p className="text-sm text-cyan-400 font-medium mb-1">
                  Overview
                </p>

                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Inventory Dashboard
                </h1>

                <p className="text-slate-400 mt-2">
                  Manage products, stock and warehouse inventory.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAdd(true)}
                className="
                  w-full md:w-auto
                  px-5 py-3
                  rounded-xl
                  bg-gradient-to-r from-orange-500 to-amber-400
                  text-slate-950
                  font-semibold
                  shadow-lg shadow-orange-500/20
                  hover:scale-[1.02]
                  transition
                "
              >
                + Add New Item
              </button>

            </div>

            {/* ================= DASHBOARD CARDS ================= */}

            <section className="mb-8">
              <DashboardCards items={items} />
            </section>

            {/* ================= INVENTORY SECTION ================= */}

            <section
              className="
                bg-[#111a2b]
                border border-slate-800
                rounded-2xl
                shadow-2xl
                overflow-hidden
              "
            >

              {/* Section Header */}

              <div className="p-5 md:p-6 border-b border-slate-800">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Inventory List
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                      View and manage all inventory items
                    </p>
                  </div>

                  <div className="text-sm text-slate-400">
                    Showing{" "}
                    <span className="text-white font-semibold">
                      {filteredItems.length}
                    </span>{" "}
                    items
                  </div>

                </div>

                {/* Search & Filter */}

                <div className="mt-5">
                  <SearchFilter
                    search={search}
                    category={category}
                    status={status}
                    setSearch={setSearch}
                    setCategory={setCategory}
                    setStatus={setStatus}
                    onAdd={() => setShowAdd(true)}
                  />
                </div>

              </div>

              {/* ================= TABLE ================= */}

              <div className="overflow-x-auto">

                <InventoryTable
                  items={filteredItems}
                  onView={setViewingItem}
                  onEdit={setEditingItem}
                  onDelete={setDeletingItem}
                />

              </div>

            </section>

          </div>

        </main>

      </div>

      {/* ================= ADD ITEM ================= */}

      {showAdd && (
        <AddItemForm
          onClose={() => setShowAdd(false)}
          onAdd={(item) => {
            addItem(item);
            setShowAdd(false);
          }}
        />
      )}

      {/* ================= EDIT ITEM ================= */}

      {editingItem && (
        <EditItemForm
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={(item) => {
            updateItem(item);
            setEditingItem(null);
          }}
        />
      )}

      {/* ================= VIEW ITEM ================= */}

      {viewingItem && (
        <ItemDetails
  item={viewingItem}
  onClose={() => setViewingItem(null)}
  onSave={(updatedItem) => {
    updateItem(updatedItem);
    setViewingItem(null);
  }}
/>
      )}

      {/* ================= DELETE ITEM ================= */}

      {deletingItem && (
        <DeleteDialog
          item={deletingItem}
          onClose={() => setDeletingItem(null)}
          onConfirm={deleteItem}
        />
      )}

    </div>
  );
}

export default Dashboard;