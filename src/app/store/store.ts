import { configureStore } from '@reduxjs/toolkit'
import { articlesApi } from 'app/api/articlesApi'
import { contactsApi } from 'app/api/contactsApi'
import { reviewsApi } from 'app/api/reviewsApi'
import { teamApi } from 'app/api/teamApi'

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      articlesApi.middleware,
      reviewsApi.middleware,
      contactsApi.middleware,
      teamApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
