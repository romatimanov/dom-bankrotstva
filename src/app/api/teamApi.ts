import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getTeam: builder.query<any[], void>({
      query: () => 'team',
      transformResponse: (response: { success: boolean; data: any[] }) => response.data || []
    }),

    createTeam: builder.mutation<any, Partial<any>>({
      query: (team) => ({
        url: 'team',
        method: 'POST',
        body: team
      })
    }),

    updateTeam: builder.mutation<any, { id: number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `team`,
        method: 'PUT',
        body: { id, ...data }
      })
    }),

    deleteTeam: builder.mutation<any, number>({
      query: (id) => ({
        url: 'team',
        method: 'DELETE',
        body: { id }
      })
    }),
    deleteImage: builder.mutation<any, string>({
      async queryFn(imageUrl) {
        try {
          const base =
            'https://fugimwfsmqeepaojaphc.supabase.co/storage/v1/object/public/dombankrot/'

          const index = imageUrl.indexOf(base)

          if (index === -1) {
            return { error: { status: 400, data: 'Неверный путь к изображению' } }
          }

          const path = imageUrl.slice(index + base.length)

          const res = await fetch('/api/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path })
          })

          const data = await res.json()

          if (!data.success) {
            return { error: { status: 500, data: data.error || 'Ошибка удаления' } }
          }

          return { data: { path } }
        } catch (error: any) {
          return { error: { status: 500, data: error?.message || 'Неизвестная ошибка' } }
        }
      }
    })
  })
})

export const {
  useGetTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useDeleteImageMutation
} = teamApi
