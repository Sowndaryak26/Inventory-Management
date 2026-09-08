export type StockStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";

export interface InventoryItem {
  id: number;
  itemCode: string;
  itemName: string;
  category: string;
  stockQuantity: number;
  unitPrice: number;
  warehouse: string;
  status: StockStatus;
}