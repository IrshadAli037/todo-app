import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.unshift(action.payload); //push for end, unshift for start
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((x) => x.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
  },
});

export const { setItems, addItem, updateItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;
