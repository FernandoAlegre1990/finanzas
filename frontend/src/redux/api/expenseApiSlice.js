import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, EXPENSES_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const state = api.getState();
  const token = state.auth.userInfo?.token;

  if (token) {
    args.headers = {
      ...args.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return baseQuery(args, api, extraOptions);
};

const expensesApiSlice = createApi({
  reducerPath: 'expensesApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Expense'],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => `${EXPENSES_URL}/get-expenses`,
      providesTags: ['Expense'],
    }),
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: `${EXPENSES_URL}/add-expense`,
        method: 'POST',
        body: newExpense,
      }),
      invalidatesTags: ['Expense'],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `${EXPENSES_URL}/delete-expense/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
});

export const { 
  useGetExpensesQuery, 
  useAddExpenseMutation, 
  useDeleteExpenseMutation 
} = expensesApiSlice;

export default expensesApiSlice;