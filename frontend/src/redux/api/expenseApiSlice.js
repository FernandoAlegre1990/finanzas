import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EXPENSES_URL } from '../constants'; // Asegúrate de tener la constante correcta

const expensesApiSlice = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Cambia la URL si es necesario
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => `${EXPENSES_URL}/get-expenses`,
    }),
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: `${EXPENSES_URL}/add-expense`,
        method: 'POST',
        body: newExpense,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `${EXPENSES_URL}/delete-expense/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useGetExpensesQuery, 
  useAddExpenseMutation, 
  useDeleteExpenseMutation 
} = expensesApiSlice;

export default expensesApiSlice;
