import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getItemsFromDB, insertItemToDB, updateItemInDB, deleteItemFromDB } from '../database/dbService';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  return await getItemsFromDB();
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {

  await insertItemToDB(item.name, item.description);
  return await getItemsFromDB();
});

export const updateItem = createAsyncThunk('items/updateItem', async (item) => {
  await updateItemInDB(item.id, item.name, item.description);
  return await getItemsFromDB();
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  await deleteItemFromDB(id);
  return await getItemsFromDB();
});



const initialState = {
  data: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const fulfilled = (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    };

    const pending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    };

    builder
      .addCase(fetchItems.pending, pending)
      .addCase(fetchItems.fulfilled, fulfilled)
      .addCase(fetchItems.rejected, rejected)

      .addCase(addItem.pending, pending)
      .addCase(addItem.fulfilled, fulfilled)
      .addCase(addItem.rejected, rejected)

      .addCase(updateItem.pending, pending)
      .addCase(updateItem.fulfilled, fulfilled)
      .addCase(updateItem.rejected, rejected)

      .addCase(deleteItem.pending, pending)
      .addCase(deleteItem.fulfilled, fulfilled)
      .addCase(deleteItem.rejected, rejected);
  },
});

export default itemsSlice.reducer;

