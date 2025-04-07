import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query<any[], void>({
      query: () => 'articles',
      transformResponse: (response: { success: boolean; data: any[] }) => response.data || []
    }),

    getArticleBySlug: builder.query<any, string>({
      query: (slug) => `articles?slug=${slug}`,
      transformResponse: (response: { success: boolean; data: any }) => response.data
    }),

    addLike: builder.mutation<any, string>({
      query: (id) => ({
        url: `likes?id=${id}`,
        method: 'POST'
      })
    }),

    addView: builder.mutation<any, string>({
      query: (id) => ({
        url: `views/${id}`,
        method: 'POST'
      })
    })
  })
})

export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useAddLikeMutation,
  useAddViewMutation
} = articlesApi
