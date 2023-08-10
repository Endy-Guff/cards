import { useState } from 'react'

import { AddPackSchema } from '../../common/formSchemas/formSchemas.ts'
import { Pagination, Table } from '../../components'
import { useCreateDeckMutation, useGetDecksQuery } from '../../services/decks'
import { decksActions, DecksSliceStateType } from '../../services/decks/decksSlice.ts'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

import { AddPackModal } from './addPackModal/addPackModal.tsx'
import { DecksToolBar } from './decksToolBar/decksToolBar.tsx'

export const Decks = () => {
  const [addPackModalIsOpen, setAddPackModalIsOpen] = useState<boolean>(false)
  const { itemsPerPage, currentPage, searchByName } = useAppSelector<DecksSliceStateType>(
    state => state.decksSlice
  )
  const dispatch = useAppDispatch()
  const { setItemsPerPage, setCurrentPage } = decksActions

  const { isLoading, data } = useGetDecksQuery({
    itemsPerPage: itemsPerPage,
    currentPage: currentPage,
    name: searchByName,
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
    <div>
      <AddPackModal
        open={addPackModalIsOpen}
        onClose={() => setAddPackModalIsOpen(false)}
        onSubmitCallback={createDeckFormSubmit}
      />
      <DecksToolBar
        headerCallback={() => setAddPackModalIsOpen(true)}
        headerButtonTitle={'Add New Pack'}
        headerTitle={'Packs list'}
      />
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created by</Table.HeadCell>
            <Table.HeadCell> </Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.items.map(({ name, author, cardsCount, updated, id }) => {
            return (
              <Table.Row key={id}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{cardsCount}</Table.Cell>
                <Table.Cell>{new Date(updated).toLocaleDateString('ru-Ru')}</Table.Cell>
                <Table.Cell>{author.name}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
      <Pagination
        pagesCount={data!.pagination.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPageHandler}
        itemsPerPage={itemsPerPage}
        changeItemsPerPage={setItemsPerPageHandler}
      />
    </div>
  )
}
