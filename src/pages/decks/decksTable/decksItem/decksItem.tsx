import { FC, Fragment, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { AddPackSchema } from '../../../../common/formSchemas/formSchemas.ts'
import { Table, TableMenu } from '../../../../components'
import { useGetMeQuery } from '../../../../services/auth'
import { useDeleteDeckMutation, useUpdateDeckMutation } from '../../../../services/decks'
import { DecksResponse } from '../../../../services/decks/types.ts'

import { DeleteDecksModal } from './deleteDecksModal/deleteDecksModal.tsx'
import { EditDecksModal } from './editDecksModal/editDecksModal.tsx'

type DecksItemPropsType = {
  data: DecksResponse | undefined
}
export const DecksItem: FC<DecksItemPropsType> = ({ data }) => {
  const navigate = useNavigate()
  const { data: meData } = useGetMeQuery()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const [deleteDeckModalIsOpen, setDeleteDeckModalIsOpen] = useState<boolean>(false)
  const [editDeckModalIsOpen, setEditDeckModalIsOpen] = useState<boolean>(false)
  const [editDeckId, setEditDeckId] = useState<string>('')
  const [deleteDeckId, setDeleteDeckId] = useState<string>('')
  const showDeleteDeckModal = (id: string) => {
    setDeleteDeckId(id)
    setDeleteDeckModalIsOpen(true)
  }
  const openEditDeckModalHandler = (id: string) => {
    setEditDeckId(id)
    setEditDeckModalIsOpen(true)
  }

  const updateDeckFormSubmit = (data: AddPackSchema) => {
    updateDeck({ name: data.namePack, id: editDeckId, isPrivate: data.private })
  }

  const deleteDeckHandler = () => {
    deleteDeck({ id: deleteDeckId })
  }

  const mappedItems = data?.items.map(({ name, author, cardsCount, updated, id }) => {
    const onDeckClickHandler = () => {
      navigate(`deck/${id}`)
    }

    return (
      <Fragment key={id}>
        <EditDecksModal
          open={editDeckId === id ? editDeckModalIsOpen : false}
          onClose={() => setEditDeckModalIsOpen(false)}
          onSubmitCallback={updateDeckFormSubmit}
        />
        <DeleteDecksModal
          open={deleteDeckId === id ? deleteDeckModalIsOpen : false}
          onClose={() => setDeleteDeckModalIsOpen(false)}
          deleteDeck={deleteDeckHandler}
        />
        <Table.Row key={id} onClick={onDeckClickHandler}>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{cardsCount}</Table.Cell>
          <Table.Cell>{new Date(updated).toLocaleDateString('ru-Ru')}</Table.Cell>
          <Table.Cell>{author.name}</Table.Cell>
          <Table.Cell>
            {author.id === meData?.id && (
              <TableMenu
                id={id}
                deleteCallback={showDeleteDeckModal}
                changeCallback={openEditDeckModalHandler}
              />
            )}
          </Table.Cell>
        </Table.Row>
      </Fragment>
    )
  })

  return <>{mappedItems}</>
}
