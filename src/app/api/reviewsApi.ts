import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getReviews: builder.query<any[], void>({
      query: () => 'reviews',
      transformResponse: (response: { success: boolean; data: any[] }) => response.data || []
    }),

    createReview: builder.mutation<any, Partial<any>>({
      query: (review) => ({
        url: 'reviews',
        method: 'POST',
        body: review
      })
    }),

    updateReview: builder.mutation<any, { id: number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `reviews`,
        method: 'PUT',
        body: { id, ...data }
      })
    }),

    deleteReview: builder.mutation<any, number>({
      query: (id) => ({
        url: 'reviews',
        method: 'DELETE',
        body: { id }
      })
    })
  })
})

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} = reviewsApi
