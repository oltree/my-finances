import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../shared/types/category';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../thunks/categoties';

interface IInitialState {
  status: string;
  error?: string;
  categories: ICategory[];
}

const initialState: IInitialState = {
  status: 'succeeded',
  error: '',
  categories: [],
};

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
      })

      .addCase(createCategory.pending, state => {
        state.status = 'loading';
      })
      .addCase(createCategory.fulfilled, (state, { payload: category }) => {
        state.status = 'succeeded';
        state.categories.push(category);
      })
      .addCase(createCategory.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })

      .addCase(updateCategory.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        updateCategory.fulfilled,
        (state, { payload: updatedCategory }) => {
          state.categories = state.categories.map(category =>
            category.id === updatedCategory.id ? updatedCategory : category
          );
        }
      )
      .addCase(updateCategory.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      })

      .addCase(deleteCategory.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, { payload: deletedCategoryId }) => {
          state.categories = state.categories.filter(
            category => category.id !== deletedCategoryId
          );
        }
      )
      .addCase(deleteCategory.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      });
  },
});

export default categoriesSlice.reducer;
