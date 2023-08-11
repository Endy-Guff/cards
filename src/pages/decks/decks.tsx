import { useState } from 'react'

import { AddPackSchema } from '../../common/formSchemas/formSchemas.ts'
import { Header, Page, PagesHeader, Pagination, Typography } from '../../components'
import { useCreateDeckMutation, useGetDecksQuery } from '../../services/decks'
import { decksActions, DecksSliceStateType } from '../../services/decks/decksSlice.ts'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

import { AddPackModal } from './addPackModal/addPackModal.tsx'
import { DecksTable } from './decksTable/decksTable.tsx'
import { DecksToolBar } from './decksToolBar/decksToolBar.tsx'

export const Decks = () => {
  const [addPackModalIsOpen, setAddPackModalIsOpen] = useState<boolean>(false)
  const {
    itemsPerPage,
    currentPage,
    searchByName,
    minMaxCardsCount: [min, max],
    authorId,
  } = useAppSelector<DecksSliceStateType>(state => state.decksSlice)
  const dispatch = useAppDispatch()
  const { setItemsPerPage, setCurrentPage } = decksActions

  const { isLoading, data } = useGetDecksQuery({
    itemsPerPage: itemsPerPage,
    currentPage: currentPage,
    name: searchByName,
    minCardsCount: min,
    maxCardsCount: max,
    authorId,
  })
  const [createDeck, { isLoading: isCreatedDeckLoading }] = useCreateDeckMutation()
  const createDeckFormSubmit = (data: AddPackSchema) => {
    createDeck({ name: data.namePack, isPrivate: data.private })
  }
  const setCurrentPageHandler = (count: number) => {
    dispatch(setCurrentPage({ currentPage: count }))
  }

  const setItemsPerPageHandler = (count: number) => {
    dispatch(setItemsPerPage({ itemsPerPage: count }))
  }

  if (isLoading || isCreatedDeckLoading) return <div>Loading...</div>

  return (
    <>
      <Header isLoggedIn={false} />
      <AddPackModal
        open={addPackModalIsOpen}
        onClose={() => setAddPackModalIsOpen(false)}
        onSubmitCallback={createDeckFormSubmit}
      />
      <Page>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          <PagesHeader
            buttonCallback={() => setAddPackModalIsOpen(true)}
            buttonTitle={'Add New Pack'}
          >
            <Typography.Large>Packs list</Typography.Large>
          </PagesHeader>
          <DecksToolBar />
          <DecksTable data={data} />
          <Pagination
            pagesCount={data!.pagination.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPageHandler}
            itemsPerPage={itemsPerPage}
            changeItemsPerPage={setItemsPerPageHandler}
          />
        </div>
      </Page>
    </>
  )
}
