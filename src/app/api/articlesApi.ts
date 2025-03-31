import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getArticles: builder.query<any[], void>({
      query: () => 'get_article.php',
      transformResponse: (response: { success: boolean; data: any[] }) => response.data || []
    }),
    getArticleById: builder.query<any, string>({
      query: (id) => `get_article.php?id=${id}`,
      transformResponse: (response: { success: boolean; data: any }) => response.data
    }),
    getArticleBySlug: builder.query<any, string>({
      query: (slug) => `get_article.php?slug=${slug}`,
      transformResponse: (response: { success: boolean; data: any }) => response.data
    }),
    addLike: builder.mutation<any, string>({
      query: (id) => ({
        url: `update_like.php?id=${id}`,
        method: 'POST'
      })
    }),
    addView: builder.mutation<any, string>({
      query: (id) => ({
        url: `update_view.php?id=${id}`,
        method: 'POST'
      })
    })
  })
})

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticleBySlugQuery,
  useAddLikeMutation,
  useAddViewMutation
} = articlesApi
