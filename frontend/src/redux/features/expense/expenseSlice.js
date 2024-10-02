import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetExpenses: (state) => {
      state.expenses = [];  // Limpia la lista de gastos
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setExpenses, setLoading, setError, resetExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;
