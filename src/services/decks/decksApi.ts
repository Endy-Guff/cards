import { baseApi } from '../baseApi.ts'

import {
  CreateDeckArgs,
  DecksResponse,
  Deck,
  DeleteDeckResponse,
  GetDecksArgs,
  UpdateDeckArgs,
  UpdateDeckResponse,
  LearnDeckCard,
  LearnGradeArgs,
  LearnGrade,
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
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
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
      updateDeck: builder.mutation<UpdateDeckResponse, UpdateDeckArgs>({
        query: ({ id, isPrivate, name }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'PATCH',
            body: { name, isPrivate },
          }
        },
        invalidatesTags: ['Decks'],
      }),
      getDeckById: builder.query<Deck, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'GET',
          }
        },
        providesTags: ['Decks'],
      }),
      learnDeck: builder.query<LearnDeckCard, { id: string }>({
        query: ({ id }) => {
          return {
            url: `/v1/decks/${id}/learn`,
            method: 'GET',
          }
        },
      }),
      learnGrade: builder.mutation<LearnGrade, LearnGradeArgs>({
        query: ({ id, grade, cardId }) => {
          return {
            url: `/v1/decks/${id}/learn`,
            method: 'POST',
            body: { cardId, grade },
          }
        },
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
  useGetDeckByIdQuery,
  useLearnDeckQuery,
  useLearnGradeMutation,
} = decksApi
