import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TransactionService } from '../../services/transaction';
import { ITransaction } from '../../shared/types/transaction';

interface IInitialState {
  status: string;
  transactions: ITransaction[];
  error?: string;
}

const initialState: IInitialState = {
  status: 'succeeded',
  transactions: [],
  error: '',
};

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await TransactionService.getAll();

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTransactions.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getTransactions.fulfilled,
        (state, { payload: transactions }) => {
          state.status = 'succeeded';
          state.transactions = transactions;
        }
      )
      .addCase(getTransactions.rejected, (state, { error }) => {
        state.status = 'failed';
        state.transactions = [];
        state.error = error.message;
      });
  },
});

export default transactionsSlice.reducer;
