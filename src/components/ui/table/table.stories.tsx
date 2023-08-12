import { Meta, StoryObj } from '@storybook/react'

import { TableMenu } from '../tableMenu'

import { Table } from './table.tsx'

const meta = {
  title: 'Components/Table',
  component: Table.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Table.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <Table.Root {...args} />,

  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created by</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Pack Name 1</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>18.03.2021</Table.Cell>
            <Table.Cell>Ivan Ivanov</Table.Cell>
            <Table.Cell>
              <TableMenu
                id={'id-1'}
                deleteCallback={() => {}}
                changeCallback={() => {}}
                playCallback={() => {}}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Pack Name 2</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>18.03.2021</Table.Cell>
            <Table.Cell>Ivan Ivanov</Table.Cell>
            <Table.Cell>
              <TableMenu
                id={'id-2'}
                deleteCallback={() => {}}
                changeCallback={() => {}}
                playCallback={() => {}}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Pack Name 3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>18.03.2021</Table.Cell>
            <Table.Cell>Ivan Ivanov</Table.Cell>
            <Table.Cell>
              <TableMenu
                id={'id-3'}
                deleteCallback={() => {}}
                changeCallback={() => {}}
                playCallback={() => {}}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}

const data = [
  {
    id: 'id-1',
    name: 'Pack Name 1',
    cardsCount: 4,
    lastUpdated: '18.03.2021',
    creator: 'Ivan Ivanov',
  },
  {
    id: 'id-2',
    name: 'Pack Name 2',
    cardsCount: 4,
    lastUpdated: '18.03.2021',
    creator: 'Ivan Ivanov',
  },
  {
    id: 'id-3',
    name: 'Pack Name 3',
    cardsCount: 4,
    lastUpdated: '18.03.2021',
    creator: 'Ivan Ivanov',
  },
]

export const TableWithMappedData: Story = {
  render: args => <Table.Root {...args} />,

  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created by</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(item => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.cardsCount}</Table.Cell>
                <Table.Cell>{item.lastUpdated}</Table.Cell>
                <Table.Cell>{item.creator}</Table.Cell>
                <Table.Cell>
                  <TableMenu
                    id={item.id}
                    deleteCallback={() => {}}
                    changeCallback={() => {}}
                    playCallback={() => {}}
                  />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </>
    ),
  },
}
