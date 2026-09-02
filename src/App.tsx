import { useState } from "react";
import {
  Add,
  Delete,
  Edit,
  Inventory2,
  Search,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./App.css";

type Item = {
  id: number;
  code: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  warehouse: string;
};

const initialItems: Item[] = [
  {
    id: 1,
    code: "INV-001",
    name: "Laptop",
    category: "Electronics",
    stock: 45,
    price: 55000,
    warehouse: "Chennai",
  },
  {
    id: 2,
    code: "INV-002",
    name: "Wireless Mouse",
    category: "Accessories",
    stock: 12,
    price: 850,
    warehouse: "Bangalore",
  },
  {
    id: 3,
    code: "INV-003",
    name: "Keyboard",
    category: "Accessories",
    stock: 5,
    price: 1200,
    warehouse: "Chennai",
  },
  {
    id: 4,
    code: "INV-004",
    name: "Office Chair",
    category: "Furniture",
    stock: 0,
    price: 7500,
    warehouse: "Salem",
  },
];

function getStatus(stock: number) {
  if (stock === 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
}

function App() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [openView, setOpenView] = useState(false);

  const [form, setForm] = useState({
    code: "",
    name: "",
    category: "Electronics",
    stock: "",
    price: "",
    warehouse: "",
  });

  const filteredItems = items.filter((item) => {
    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || item.category === category;

    const statusMatch =
      status === "All" || getStatus(item.stock) === status;

    return searchMatch && categoryMatch && statusMatch;
  });

  const totalItems = items.length;

  const lowStock = items.filter(
    (item) => getStatus(item.stock) === "Low Stock"
  ).length;

  const outOfStock = items.filter(
    (item) => getStatus(item.stock) === "Out of Stock"
  ).length;

  const inventoryValue = items.reduce(
    (total, item) => total + item.stock * item.price,
    0
  );

  const resetForm = () => {
    setForm({
      code: "",
      name: "",
      category: "Electronics",
      stock: "",
      price: "",
      warehouse: "",
    });
    setEditingItem(null);
  };

  const handleAdd = () => {
    resetForm();
    setOpenForm(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);

    setForm({
      code: item.code,
      name: item.name,
      category: item.category,
      stock: String(item.stock),
      price: String(item.price),
      warehouse: item.warehouse,
    });

    setOpenForm(true);
  };

  const handleSave = () => {
    if (
      !form.code ||
      !form.name ||
      !form.stock ||
      !form.price ||
      !form.warehouse
    ) {
      return;
    }

    if (editingItem) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                code: form.code,
                name: form.name,
                category: form.category,
                stock: Number(form.stock),
                price: Number(form.price),
                warehouse: form.warehouse,
              }
            : item
        )
      );
    } else {
      setItems((current) => [
        ...current,
        {
          id: Date.now(),
          code: form.code,
          name: form.name,
          category: form.category,
          stock: Number(form.stock),
          price: Number(form.price),
          warehouse: form.warehouse,
        },
      ]);
    }

    setOpenForm(false);
    resetForm();
  };

  const handleDelete = () => {
    if (selectedItem) {
      setItems((current) =>
        current.filter((item) => item.id !== selectedItem.id)
      );
    }

    setOpenDelete(false);
    setSelectedItem(null);
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Inventory2 />
          </div>

          <div>
            <h2>StockFlow</h2>
            <span>Inventory System</span>
          </div>
        </div>

        <nav className="navigation">
          <div className="nav-item active">Dashboard</div>
          <div className="nav-item">Inventory</div>
          <div className="nav-item">Categories</div>
          <div className="nav-item">Warehouses</div>
          <div className="nav-item">Reports</div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* HEADER */}
        <header className="header">
          <div>
            <h1>Inventory Management</h1>
            <p>Manage your inventory efficiently</p>
          </div>

          <div className="profile">G</div>
        </header>

        <div className="content">
          {/* TITLE */}
          <div className="page-title">
            <div>
              <h2>Inventory Overview</h2>
              <p>Monitor stock levels and inventory value</p>
            </div>

            <button className="add-button" onClick={handleAdd}>
              <Add />
              Add New Item
            </button>
          </div>

          {/* CARDS */}
          <div className="cards">
            <div className="card">
              <span>Total Items</span>
              <strong>{totalItems}</strong>
              <small>All inventory items</small>
            </div>

            <div className="card">
              <span>Low Stock Items</span>
              <strong className="yellow">{lowStock}</strong>
              <small>Need attention</small>
            </div>

            <div className="card">
              <span>Out of Stock</span>
              <strong className="red">{outOfStock}</strong>
              <small>Items unavailable</small>
            </div>

            <div className="card">
              <span>Total Inventory Value</span>
              <strong>
                ₹{inventoryValue.toLocaleString("en-IN")}
              </strong>
              <small>Current stock value</small>
            </div>
          </div>

          {/* FILTER */}
          <div className="filter-box">
            <div className="search-box">
              <Search />
              <input
                type="text"
                placeholder="Search by item name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
            </Select>

            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              size="small"
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Low Stock">Low Stock</MenuItem>
              <MenuItem value="Out of Stock">Out of Stock</MenuItem>
            </Select>
          </div>

          {/* TABLE */}
          <div className="table-card">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Unit Price</th>
                    <th>Warehouse</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredItems.map((item) => {
                    const itemStatus = getStatus(item.stock);

                    return (
                      <tr key={item.id}>
                        <td className="code">{item.code}</td>
                        <td className="item-name">{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.stock}</td>
                        <td>
                          ₹{item.price.toLocaleString("en-IN")}
                        </td>
                        <td>{item.warehouse}</td>

                        <td>
                          <span
                            className={`status ${itemStatus
                              .toLowerCase()
                              .replaceAll(" ", "-")}`}
                          >
                            {itemStatus}
                          </span>
                        </td>

                        <td className="actions">
                          <IconButton
  size="small"
  onClick={() => {
    setSelectedItem(item);
    setOpenView(true);
  }}
>
  <Visibility fontSize="small" />
</IconButton>

                          <IconButton
                            size="small"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedItem(item);
                              setOpenDelete(true);
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              Showing {filteredItems.length} of {items.length} items
              <span>Page 1</span>
            </div>
          </div>
        </div>
      </main>

      {/* ADD / EDIT DIALOG */}
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingItem ? "Edit Inventory Item" : "Add New Item"}
        </DialogTitle>

        <DialogContent>
          <div className="form-grid">
            <TextField
              label="Item Code"
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value })
              }
            />

            <TextField
              label="Item Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <TextField
              select
              label="Category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
            </TextField>

            <TextField
              label="Stock Quantity"
              type="number"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
            />

            <TextField
              label="Unit Price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <TextField
              label="Warehouse / Location"
              value={form.warehouse}
              onChange={(e) =>
                setForm({ ...form, warehouse: e.target.value })
              }
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave}>
            {editingItem ? "Update Item" : "Add Item"}
          </Button>
        </DialogActions>
      </Dialog>
     {/* VIEW DIALOG */}
<Dialog
  open={openView}
  onClose={() => setOpenView(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle>Item Details</DialogTitle>

  <DialogContent>
    {selectedItem && (
      <div className="view-details">
        <div>
          <span>Item Code</span>
          <strong>{selectedItem.code}</strong>
        </div>

        <div>
          <span>Item Name</span>
          <strong>{selectedItem.name}</strong>
        </div>

        <div>
          <span>Category</span>
          <strong>{selectedItem.category}</strong>
        </div>

        <div>
          <span>Stock</span>
          <strong>{selectedItem.stock}</strong>
        </div>

        <div>
          <span>Unit Price</span>
          <strong>
            ₹{selectedItem.price.toLocaleString("en-IN")}
          </strong>
        </div>

        <div>
          <span>Warehouse</span>
          <strong>{selectedItem.warehouse}</strong>
        </div>

        <div>
          <span>Status</span>
          <strong>{getStatus(selectedItem.stock)}</strong>
        </div>
      </div>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenView(false)}>
      Close
    </Button>
  </DialogActions>
</Dialog>
      {/* DELETE DIALOG */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Item?</DialogTitle>

        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>{selectedItem?.name}</strong>?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;