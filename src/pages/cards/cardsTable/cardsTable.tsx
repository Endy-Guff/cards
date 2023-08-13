import { FC } from 'react'

import { Table } from '../../../components'
import { CardsResponse } from '../../../services/cards/types.ts'

import { CardsItem } from './cardsItem/cardsItem.tsx'

type CardsTablePropsType = {
  data: CardsResponse | undefined
}
export const CardsTable: FC<CardsTablePropsType> = ({ data }) => {
  return (
    <>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Question</Table.HeadCell>
            <Table.HeadCell>Answer</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Grade</Table.HeadCell>
            <Table.HeadCell> </Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <CardsItem data={data} />
        </Table.Body>
      </Table.Root>
    </>
  )
}
