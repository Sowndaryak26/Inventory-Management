export type InventoryStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";

export type InventoryItem = {
  id: number;
  itemCode: string;
  itemName: string;
  category: string;
  stockQuantity: number;
  unitPrice: number;
  location: string;
  status: InventoryStatus;
};

export const initialInventoryData: InventoryItem[] = [
  {
    id: 1,
    itemCode: "IT001",
    itemName: "Laptop",
    category: "Electronics",
    stockQuantity: 25,
    unitPrice: 50000,
    location: "Chennai Warehouse",
    status: "In Stock",
  },
  {
    id: 2,
    itemCode: "IT002",
    itemName: "Keyboard",
    category: "Accessories",
    stockQuantity: 8,
    unitPrice: 1200,
    location: "Chennai Warehouse",
    status: "Low Stock",
  },
  {
    id: 3,
    itemCode: "IT003",
    itemName: "Mouse",
    category: "Accessories",
    stockQuantity: 0,
    unitPrice: 800,
    location: "Bangalore Warehouse",
    status: "Out of Stock",
  },
  {
    id: 4,
    itemCode: "IT004",
    itemName: "Monitor",
    category: "Electronics",
    stockQuantity: 15,
    unitPrice: 15000,
    location: "Chennai Warehouse",
    status: "In Stock",
  },
  {
    id: 5,
    itemCode: "IT005",
    itemName: "Office Chair",
    category: "Furniture",
    stockQuantity: 4,
    unitPrice: 7500,
    location: "Coimbatore Warehouse",
    status: "Low Stock",
  },
  {
    id: 6,
    itemCode: "IT006",
    itemName: "Printer",
    category: "Electronics",
    stockQuantity: 12,
    unitPrice: 18500,
    location: "Bangalore Warehouse",
    status: "In Stock",
  },
  {
    id: 7,
    itemCode: "IT007",
    itemName: "USB Cable",
    category: "Accessories",
    stockQuantity: 6,
    unitPrice: 350,
    location: "Chennai Warehouse",
    status: "Low Stock",
  },
  {
    id: 8,
    itemCode: "IT008",
    itemName: "Desk",
    category: "Furniture",
    stockQuantity: 0,
    unitPrice: 9500,
    location: "Coimbatore Warehouse",
    status: "Out of Stock",
  },
  {
    id: 9,
    itemCode: "IT009",
    itemName: "Headset",
    category: "Accessories",
    stockQuantity: 30,
    unitPrice: 1800,
    location: "Bangalore Warehouse",
    status: "In Stock",
  },
  {
    id: 10,
    itemCode: "IT010",
    itemName: "Web Camera",
    category: "Electronics",
    stockQuantity: 3,
    unitPrice: 3200,
    location: "Chennai Warehouse",
    status: "Low Stock",
  },
];