import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  itemsPerPage: 15,
  currentDeckId: null as null | string,
}

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage
    },
    setItemsPerPage: (state, action: PayloadAction<{ itemsPerPage: number }>) => {
      state.itemsPerPage = action.payload.itemsPerPage
    },
    setCurrentDeckId: (state, action: PayloadAction<{ id: string }>) => {
      state.currentDeckId = action.payload.id
    },
  },
})

export const cardsReducer = cardsSlice.reducer
export const cardsActions = cardsSlice.actions

export type CardsSliceStateType = typeof initialState
