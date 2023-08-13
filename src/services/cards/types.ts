import { PaginationEntity } from '../types.ts'

export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg: string
  answerImg: string
  questionVideo?: string | undefined
  answerVideo?: string | undefined
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}

export type CardsResponse = PaginationEntity<Card> & {
  maxCardsCount: number
}

export type GetCardsArgs = {
  id: string
  question?: string
  answer?: string
  currentPage: number
  itemsPerPage: number
}
