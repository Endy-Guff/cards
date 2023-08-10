import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  itemsPerPage: 15,
  searchByName: '',
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
      debugger
      state.searchByName = action.payload.searchByName
    },
  },
})

export const decksReducer = decksSlice.reducer
export const decksActions = decksSlice.actions

export type DecksSliceStateType = typeof initialState
