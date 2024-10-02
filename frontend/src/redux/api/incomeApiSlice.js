import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, INCOMES_URL } from '../constants';

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

const incomeApiSlice = createApi({
  reducerPath: 'incomeApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => `${INCOMES_URL}/get-incomes`,
    }),
    addIncome: builder.mutation({
      query: (newIncome) => ({
        url: `${INCOMES_URL}/add-income`,
        method: 'POST',
        body: newIncome,
      }),
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `${INCOMES_URL}/delete-income/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          incomeApiSlice.util.updateQueryData('getIncomes', undefined, (draft) => {
            return draft.filter((income) => income._id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { 
  useGetIncomesQuery, 
  useAddIncomeMutation, 
  useDeleteIncomeMutation 
} = incomeApiSlice;

export default incomeApiSlice;