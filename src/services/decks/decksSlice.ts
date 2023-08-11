import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  itemsPerPage: 15,
  searchByName: '',
  minMaxCardsCount: [0, 20],
  authorId: '',
  showPacksCardsFilter: [
    { value: 'myCards', title: 'My Cards' },
    { value: 'allCards', title: 'All Cards' },
  ],
}

export const decksSlice = createSlice({
  name: 'decksSlice',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage
    },
    setItemsPerPage: (state, action: PayloadAction<{ itemsPerPage: number }>) => {
      state.itemsPerPage = action.payload.itemsPerPage
    },
    setSearchByName: (state, action: PayloadAction<{ searchByName: string }>) => {
      state.searchByName = action.payload.searchByName
    },
    setMinMaxCardsCount: (state, action: PayloadAction<{ value: number[] }>) => {
      state.minMaxCardsCount = action.payload.value
    },
    setAuthorId: (state, action: PayloadAction<{ id: string }>) => {
      state.authorId = action.payload.id
    },
  },
})

export const decksReducer = decksSlice.reducer
export const decksActions = decksSlice.actions

export type DecksSliceStateType = typeof initialState
