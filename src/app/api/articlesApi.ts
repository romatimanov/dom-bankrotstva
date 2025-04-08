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
        url: `likes/${id}`,
        method: 'POST'
      })
    }),

    addView: builder.mutation<any, string>({
      query: (id) => ({
        url: `views/${id}`,
        method: 'POST'
      })
    }),

    createArticle: builder.mutation<any, Partial<any>>({
      query: (article) => ({
        url: 'articles',
        method: 'POST',
        body: article
      })
    }),

    updateArticle: builder.mutation<any, { id: number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `articles/${id}`,
        method: 'PUT',
        body: data
      })
    }),

    deleteArticle: builder.mutation<any, number>({
      query: (id) => ({
        url: 'articles',
        method: 'DELETE',
        body: { id }
      })
    })
  })
})

export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useAddLikeMutation,
  useAddViewMutation,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation
} = articlesApi
