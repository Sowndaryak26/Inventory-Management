import type { InventoryItem } from "../data/inventorydata";
import { initialInventoryData } from "../data/inventorydata";

const STORAGE_KEY = "inventory-items";

const getStoredItems = (): InventoryItem[] => {
  const storedItems = localStorage.getItem(STORAGE_KEY);

  if (storedItems) {
    return JSON.parse(storedItems);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialInventoryData));

  return initialInventoryData;
};

// READ
export const getInventoryItems = async (): Promise<InventoryItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return getStoredItems();
};

// CREATE
export const createInventoryItem = async (
  item: Omit<InventoryItem, "id">
): Promise<InventoryItem> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const items = getStoredItems();

  const newItem: InventoryItem = {
    ...item,
    id: Date.now(),
  };

  const updatedItems = [...items, newItem];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));

  return newItem;
};

// UPDATE
export const updateInventoryItem = async (
  id: number,
  updatedItem: Omit<InventoryItem, "id">
): Promise<InventoryItem> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const items = getStoredItems();

  const updatedItemWithId: InventoryItem = {
    ...updatedItem,
    id,
  };

  const updatedItems = items.map((item) =>
    item.id === id ? updatedItemWithId : item
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));

  return updatedItemWithId;
};

// DELETE
export const deleteInventoryItem = async (
  id: number
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const items = getStoredItems();

  const updatedItems = items.filter((item) => item.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
};