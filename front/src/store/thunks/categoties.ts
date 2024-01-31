import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryService } from '../../services/category';
import { ICategory } from '../../shared/types/category';

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

export const createCategory = createAsyncThunk(
  'categories/createCategor',
  async (category: ICategory, { rejectWithValue }) => {
    try {
      const response = await CategoryService.create(
        category.id,
        category.title
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category: ICategory, { rejectWithValue }) => {
    try {
      const response = await CategoryService.update(
        category.id,
        category.title
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (category: ICategory, { rejectWithValue }) => {
    try {
      const response = await CategoryService.delete(category.id);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
