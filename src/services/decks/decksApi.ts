import { baseApi } from '../baseApi.ts'

import {
  CreateDeckArgs,
  DecksResponse,
  DecksResponseItem,
  DeleteDeckResponse,
  GetDecksArgs,
} from './types.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs>({
        query: args => {
          return {
            url: `v1/decks`,
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<DecksResponseItem, CreateDeckArgs>({
        query: ({ name, isPrivate }) => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: { name, isPrivate },
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<DeleteDeckResponse, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation, useDeleteDeckMutation } = decksApi
