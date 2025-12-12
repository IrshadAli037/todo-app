import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchItems, createItem, updateItemApi, deleteItem } from "../api/itemsApi";
import { useDispatch, useSelector } from "react-redux";
import { setItems, addItem, updateItem, removeItem } from "../store/itemsSlice";

export const useItemsQuery = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  const query = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    onSuccess: (data) => dispatch(setItems(data)),
  });

  return { ...query, items };
};



export const useCreateItem = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: (data) => {
      dispatch(addItem(data));
      queryClient.invalidateQueries(["items"]);  // 🔥 refresh list
    },
  });
};


export const useUpdateItem = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItemApi,
    onSuccess: (data) => {
      dispatch(updateItem(data));
      queryClient.invalidateQueries(["items"]);  // 🔥 refresh list
    },
  });
};


export const useDeleteItem = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: (id) => {
      dispatch(removeItem(id));
      queryClient.invalidateQueries(["items"]);  // 🔥 refresh list
    },
  });
};

