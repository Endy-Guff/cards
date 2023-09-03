import { FC, Fragment, useState } from 'react'

import { AddCardSchema } from '../../../../common/formSchemas/formSchemas.ts'
import { Grade, Table, TableMenu } from '../../../../components'
import { useGetMeQuery } from '../../../../services/auth'
import { useDeleteCardMutation, useEditCardMutation } from '../../../../services/cards/cardsApi.ts'
import { CardsResponse } from '../../../../services/cards/types.ts'
import { DeleteCardModal } from '../../deleteCardModal/deleteCardModal.tsx'
import { EditCardModal } from '../../editCardModal/editCardModal.tsx'

type CardsItemPropsType = {
  data: CardsResponse | undefined
}
export const CardsItem: FC<CardsItemPropsType> = ({ data }) => {
  const [deleteCardId, setDeleteCardId] = useState<string>('')
  const [deleteCardModalIsOpen, setDeleteCardModalIsOpen] = useState<boolean>(false)
  const [editCardId, setEditCardId] = useState<string>('')
  const [editCardModalIsOpen, setEditCardModalIsOpen] = useState<boolean>(false)
  const { data: meData } = useGetMeQuery()
  const [deleteCard] = useDeleteCardMutation()
  const [editCard] = useEditCardMutation()
  const showDeleteCardModal = (id: string) => {
    setDeleteCardId(id)
    setDeleteCardModalIsOpen(true)
  }
  const deleteCardHandler = () => {
    deleteCard({ id: deleteCardId })
    setDeleteCardModalIsOpen(false)
  }

  const showEditCardModal = (id: string) => {
    setEditCardId(id)
    setEditCardModalIsOpen(true)
  }

  const updateCardFormSubmit = (data: AddCardSchema) => {
    editCard({ id: editCardId, question: data.question, answer: data.answer })
  }

  const mappedItems = data?.items.map(({ updated, userId, id, question, answer, grade }) => {
    return (
      <Fragment key={id}>
        <DeleteCardModal
          open={deleteCardId === id ? deleteCardModalIsOpen : false}
          onClose={() => setDeleteCardModalIsOpen(false)}
          deleteCard={deleteCardHandler}
        />
        <EditCardModal
          open={editCardId === id ? editCardModalIsOpen : false}
          onClose={() => setEditCardModalIsOpen(false)}
          onSubmitCallback={updateCardFormSubmit}
          question={question}
          answer={answer}
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
              <TableMenu
                id={id}
                deleteCallback={showDeleteCardModal}
                changeCallback={showEditCardModal}
              />
            )}
          </Table.Cell>
        </Table.Row>
      </Fragment>
    )
  })

  return <>{mappedItems}</>
}
