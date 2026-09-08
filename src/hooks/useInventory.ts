import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../services/inventoryApi";

import type { InventoryItem } from "../data/inventorydata";

export const useInventory = () => {
  const queryClient = useQueryClient();

  // READ
  const inventoryQuery = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryItems,
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: (item: Omit<InventoryItem, "id">) => {
      return createInventoryItem(item);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      item,
    }: {
      id: number;
      item: Omit<InventoryItem, "id">;
    }) => {
      return updateInventoryItem(id, item);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteInventoryItem(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });

  return {
    // READ
    items: inventoryQuery.data ?? [],
    isLoading: inventoryQuery.isLoading,
    isError: inventoryQuery.isError,
    error: inventoryQuery.error,
    refetch: inventoryQuery.refetch,

    // CREATE
    createItem: createMutation.mutate,
    isCreating: createMutation.isPending,

    // UPDATE
    updateItem: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    // DELETE
    deleteItem: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};