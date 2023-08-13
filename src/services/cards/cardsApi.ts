import { baseApi } from '../baseApi.ts'

import { CardsResponse, GetCardsArgs } from './types.ts'

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
      }),
    }
  },
})

export const { useGetCardsQuery } = cardsApi
