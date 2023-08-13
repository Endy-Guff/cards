import { Pagination, PaginationEntity } from '../types.ts'

export type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: Pagination['currentPage']
  itemsPerPage?: Pagination['itemsPerPage']
}

export type CreateDeckArgs = {
  name: string
  isPrivate: boolean
}

export type DecksResponse = PaginationEntity<Deck> & {
  maxCardsCount: number
}
export type DecksResponseItemAuthor = {
  id: string
  name: string
}
export type Deck = {
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

export type DeleteDeckResponse = Omit<Deck, 'isDeleted' | 'isBlocked' | 'author'>

export type UpdateDeckArgs = CreateDeckArgs & { id: string }
export type UpdateDeckResponse = Omit<Deck, 'isDeleted' | 'isBlocked'>
