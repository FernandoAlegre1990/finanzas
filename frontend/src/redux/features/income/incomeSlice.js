import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incomes: [],
  loading: false,
  error: null,
  success: false,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncomes: (state, action) => {
      state.incomes = action.payload;
      state.loading = false;
      state.success = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.success = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetIncomes: (state) => {
      state.incomes = [];  // Limpia la lista de ingresos
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setIncomes, setLoading, setError, clearSuccess, resetIncomes } = incomeSlice.actions;

export default incomeSlice.reducer;
