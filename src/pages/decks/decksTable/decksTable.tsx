import { FC } from 'react'

import { Table } from '../../../components'
import { DecksResponse } from '../../../services/decks/types.ts'

import { DecksItem } from './decksItem/decksItem.tsx'

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
          <DecksItem data={data} />
        </Table.Body>
      </Table.Root>
    </>
  )
}
