import { FC, Fragment, useState } from 'react'

import { AddPackSchema } from '../../../../common/formSchemas/formSchemas.ts'
import { Table, TableMenu } from '../../../../components'
import { useGetMeQuery } from '../../../../services/auth'
import { useDeleteDeckMutation, useUpdateDeckMutation } from '../../../../services/decks'
import { DecksResponse } from '../../../../services/decks/types.ts'

import { EditDecksModal } from './editDecksModal/editDecksModal.tsx'

type DecksItemPropsType = {
  data: DecksResponse | undefined
}
export const DecksItem: FC<DecksItemPropsType> = ({ data }) => {
  const { data: meData } = useGetMeQuery()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const [editDeckModalIsOpen, setEditDeckModalIsOpen] = useState<boolean>(false)
  const [editDeckId, setEditDeckId] = useState<string>('')
  const deleteDeckHandler = (id: string) => {
    deleteDeck({ id: id })
  }
  const openEditDeckModalHandler = (id: string) => {
    setEditDeckId(id)
    setEditDeckModalIsOpen(true)
  }

  const updateDeckFormSubmit = (data: AddPackSchema) => {
    updateDeck({ name: data.namePack, id: editDeckId, isPrivate: data.private })
  }

  const mappedItems = data?.items.map(({ name, author, cardsCount, updated, id }) => {
    return (
      <Fragment key={id}>
        <EditDecksModal
          open={editDeckId === id ? editDeckModalIsOpen : false}
          onClose={() => setEditDeckModalIsOpen(false)}
          onSubmitCallback={updateDeckFormSubmit}
        />
        <Table.Row key={id}>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{cardsCount}</Table.Cell>
          <Table.Cell>{new Date(updated).toLocaleDateString('ru-Ru')}</Table.Cell>
          <Table.Cell>{author.name}</Table.Cell>
          <Table.Cell>
            {author.id === meData?.id && (
              <TableMenu
                id={id}
                deleteCallback={deleteDeckHandler}
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
