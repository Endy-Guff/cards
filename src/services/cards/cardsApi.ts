import { baseApi } from '../baseApi.ts'

import { Card, CardsResponse, CreateCardArgs, GetCardsArgs } from './types.ts'

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
      deleteCard: builder.mutation<any, { id: string }>({
        query: ({ id }) => {
          return {
            url: `/v1/cards/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useGetCardsQuery, useCreateCardMutation, useDeleteCardMutation } = cardsApi
