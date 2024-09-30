import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice"; // Asegúrate de que este sea tu slice de API
import authReducer from "./features/auth/authSlice";
import incomeApiSlice from './api/incomeApiSlice'; // Importa tu incomeApiSlice
import expenseApiSlice from "./api/expenseApiSlice";



const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [incomeApiSlice.reducerPath]: incomeApiSlice.reducer, // Agrega el reducer de incomeApiSlice
    [expenseApiSlice.reducerPath]: expenseApiSlice.reducer, // Agrega el reducer de expenses
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, incomeApiSlice.middleware, expenseApiSlice.middleware), // Añade el middleware
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
