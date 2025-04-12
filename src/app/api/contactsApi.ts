import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getContacts: builder.query<any[], void>({
      query: () => 'contacts',
      transformResponse: (response: { success: boolean; data: any[] }) => response.data || []
    }),

    updateContacts: builder.mutation<any, { id: number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `contacts`,
        method: 'PUT',
        body: { id, ...data }
      })
    })
  })
})

export const { useGetContactsQuery, useUpdateContactsMutation } = contactsApi
