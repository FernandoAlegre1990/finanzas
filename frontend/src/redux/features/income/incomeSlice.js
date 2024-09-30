const initialState = {
  incomes: [],
  loading: false,
  error: null,
  success: false,  // Nuevo estado
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncomes: (state, action) => {
      state.incomes = action.payload;
      state.loading = false;
      state.success = true;  // Marca la operación como exitosa
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.success = false;  // Resetea el estado de éxito cuando se cargue
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;  // Resetea el éxito en caso de error
    },
    clearSuccess: (state) => {
      state.success = false;  // Limpiar el estado success
    },
  },
});

export const { setIncomes, setLoading, setError, clearSuccess } = incomeSlice.actions;
