import { baseApi } from '../baseApi.ts'

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
      createDeck: builder.mutation<any, { name: string; isPrivate: boolean }>({
        query: ({ name, isPrivate }) => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: { name, isPrivate },
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation } = decksApi

type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type DecksResponse = {
  maxCardsCount: number
  pagination: DecksResponsePagination
  items: DecksResponseItem[]
}
export type DecksResponsePagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
export type DecksResponseItemAuthor = {
  id: string
  name: string
}
export type DecksResponseItem = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: DecksResponseItemAuthor
}
