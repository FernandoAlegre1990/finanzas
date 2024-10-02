import { createSlice } from "@reduxjs/toolkit";
import { resetIncomes } from "../income/incomeSlice";
import { resetExpenses } from "../expense/expenseSlice";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 días
      localStorage.setItem("expirationTime", expirationTime);
    },
    logoutSuccess: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logoutSuccess } = authSlice.actions;

// Acción thunk para manejar el logout y limpiar el estado de ingresos y gastos
export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());    // Limpia el estado de autenticación
  dispatch(resetIncomes());     // Limpia los ingresos
  dispatch(resetExpenses());    // Limpia los gastos
};

export default authSlice.reducer;