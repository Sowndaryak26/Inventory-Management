import {
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  onAdd: () => void;
}

function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  onAdd,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <TextField
          label="Search Item"
          placeholder="Name or Item Code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
        </TextField>

        <TextField
          select
          label="Stock Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="In Stock">In Stock</MenuItem>
          <MenuItem value="Low Stock">Low Stock</MenuItem>
          <MenuItem value="Out of Stock">Out of Stock</MenuItem>
        </TextField>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Add New Item
        </Button>

      </div>

    </div>
  );
}

export default SearchFilter;