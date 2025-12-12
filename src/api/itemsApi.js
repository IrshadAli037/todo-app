import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", //temporary json server URL
});

export const fetchItems = async () => {
  const res = await api.get("/todos");
  return res.data;
};

export const createItem = async (item) => {
  const res = await api.post("/todos", item);
  return res.data;
};

export const updateItemApi = async (item) => {
  const res = await api.put(`/todos/${item.id}`, item);
  return res.data;
};

export const deleteItem = async (id) => {
  await api.delete(`/todos/${id}`);
  return id;
};
