import { FC } from 'react'

import { Table, TableMenu } from '../../../../components'
import { useGetMeQuery } from '../../../../services/auth'
import { useDeleteDeckMutation } from '../../../../services/decks'
import { DecksResponse } from '../../../../services/decks/types.ts'

type DecksItemPropsType = {
  data: DecksResponse | undefined
}
export const DecksItem: FC<DecksItemPropsType> = ({ data }) => {
  const { data: meData } = useGetMeQuery()
  const [deleteDeck] = useDeleteDeckMutation()
  const deleteDeckHandler = (id: string) => {
    deleteDeck({ id: id })
  }

  const mappedItems = data?.items.map(({ name, author, cardsCount, updated, id }) => {
    return (
      <Table.Row key={id}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{cardsCount}</Table.Cell>
        <Table.Cell>{new Date(updated).toLocaleDateString('ru-Ru')}</Table.Cell>
        <Table.Cell>{author.name}</Table.Cell>
        <Table.Cell>
          <TableMenu
            id={id}
            deleteCallback={author.id === meData?.id ? deleteDeckHandler : undefined}
          />
        </Table.Cell>
      </Table.Row>
    )
  })

  return <>{mappedItems}</>
}
