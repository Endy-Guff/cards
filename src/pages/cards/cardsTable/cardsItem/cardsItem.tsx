import { FC, Fragment } from 'react'

import { Grade, Table } from '../../../../components'
import { CardsResponse } from '../../../../services/cards/types.ts'

type CardsItemPropsType = {
  data: CardsResponse | undefined
}
export const CardsItem: FC<CardsItemPropsType> = ({ data }) => {
  const mappedItems = data?.items.map(({ updated, id, question, answer, grade }) => {
    return (
      <Fragment key={id}>
        {/*modal*/}
        <Table.Row key={id}>
          <Table.Cell>{question}</Table.Cell>
          <Table.Cell>{answer}</Table.Cell>
          <Table.Cell>{new Date(updated).toLocaleDateString('ru-Ru')}</Table.Cell>
          <Table.Cell>
            <Grade grade={grade} />
          </Table.Cell>
          <Table.Cell> </Table.Cell>
        </Table.Row>
      </Fragment>
    )
  })

  return <>{mappedItems}</>
}
