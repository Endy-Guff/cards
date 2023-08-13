import { FC, Fragment, useState } from 'react'

import { Grade, Table, TableMenu } from '../../../../components'
import { useGetMeQuery } from '../../../../services/auth'
import { useDeleteCardMutation } from '../../../../services/cards/cardsApi.ts'
import { CardsResponse } from '../../../../services/cards/types.ts'

import { DeleteCardModal } from './deleteCardModal/deleteCardModal.tsx'

type CardsItemPropsType = {
  data: CardsResponse | undefined
}
export const CardsItem: FC<CardsItemPropsType> = ({ data }) => {
  const [deleteCardId, setDeleteCardId] = useState<string>('')
  const [deleteCardModalIsOpen, setDeleteCardModalIsOpen] = useState<boolean>(false)
  const { data: meData } = useGetMeQuery()
  const [deleteCard] = useDeleteCardMutation()
  const showDeleteCardModal = (id: string) => {
    setDeleteCardId(id)
    setDeleteCardModalIsOpen(true)
  }
  const deleteCardHandler = () => {
    deleteCard({ id: deleteCardId })
    setDeleteCardModalIsOpen(false)
  }

  const mappedItems = data?.items.map(({ updated, userId, id, question, answer, grade }) => {
    return (
      <Fragment key={id}>
        <DeleteCardModal
          open={deleteCardModalIsOpen}
          onClose={() => setDeleteCardModalIsOpen(false)}
          deleteCard={deleteCardHandler}
        />
        <Table.Row key={id}>
          <Table.Cell>{question}</Table.Cell>
          <Table.Cell>{answer}</Table.Cell>
          <Table.Cell>{new Date(updated).toLocaleDateString('ru-Ru')}</Table.Cell>
          <Table.Cell>
            <Grade grade={grade} />
          </Table.Cell>
          <Table.Cell>
            {userId === meData?.id && (
              <TableMenu id={id} deleteCallback={showDeleteCardModal} changeCallback={() => {}} />
            )}
          </Table.Cell>
        </Table.Row>
      </Fragment>
    )
  })

  return <>{mappedItems}</>
}
