import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { INCOMES_URL } from '../constants';

const incomeApiSlice = createApi({
  reducerPath: 'incomeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
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
            // Optimistic update
            const patchResult = dispatch(
              incomeApiSlice.util.updateQueryData('getIncomes', undefined, (draft) => {
                return draft.filter((income) => income._id !== id);  // Remover ingreso localmente
              })
            );
        
            try {
              await queryFulfilled;  // Esperar que la mutación en el backend sea exitosa
            } catch {
              patchResult.undo();  // Revertir si hay un error
            }
          },
        }),
    }),
  })

export const { useGetIncomesQuery, useAddIncomeMutation, useDeleteIncomeMutation } = incomeApiSlice;
export default incomeApiSlice;
