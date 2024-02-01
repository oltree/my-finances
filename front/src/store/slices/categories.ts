import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CategoryService } from '../../services/category';
import { ICategory } from '../../shared/types/category';

interface IInitialState {
  status: string;
  categories: ICategory[];
  error?: string;
}

const initialState: IInitialState = {
  status: 'succeeded',
  categories: [],
  error: '',
};

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CategoryService.getAll();

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, { payload: categories }) => {
        state.status = 'succeeded';
        state.categories = categories;
      })
      .addCase(getCategories.rejected, (state, { error }) => {
        state.status = 'failed';
        state.categories = [];
        state.error = error.message;
      });
  },
});

export default categoriesSlice.reducer;
