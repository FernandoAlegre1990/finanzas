import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants.js';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Manejar errores de análisis
  if (result.error) {
    console.error('Error en la respuesta:', result.error);
    console.error('Respuesta original:', result.error.data);
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: customBaseQuery,
  tagTypes: ['Expenses', 'Incomes', 'User', 'Category'],
  endpoints: () => ({}),
});

export const { resetApiState } = apiSlice.util;