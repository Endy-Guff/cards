import { FC } from 'react'

import { Table } from '../../../components'
import { DecksResponse } from '../../../services/decks/types.ts'

type DecksTablePropsType = {
  data: DecksResponse | undefined
}
export const DecksTable: FC<DecksTablePropsType> = ({ data }) => {
  return (
    <>
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
    </>
  )
}
