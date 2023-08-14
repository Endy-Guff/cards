import { baseApi } from '../baseApi.ts'

import { Card, CardsResponse, CreateCardArgs, EditCardArgs, GetCardsArgs } from './types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponse, GetCardsArgs>({
        query: ({ id, itemsPerPage, currentPage }) => {
          return {
            url: `v1/decks/${id}/cards`,
            params: { itemsPerPage, currentPage },
          }
        },
        providesTags: ['Cards'],
      }),
      createCard: builder.mutation<Card, CreateCardArgs>({
        query: ({ id, question, answer }) => {
          return {
            url: `/v1/decks/${id}/cards`,
            method: 'POST',
            body: { question, answer },
          }
        },
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<void, { id: string }>({
        query: ({ id }) => {
          return {
            url: `/v1/cards/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Cards'],
      }),
      editCard: builder.mutation<Card, EditCardArgs>({
        query: ({ id, question, answer }) => {
          return {
            url: `/v1/cards/${id}`,
            method: 'PATCH',
            body: { question, answer },
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
} = cardsApi
