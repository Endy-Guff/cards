import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination.tsx'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const ListCountItemsShowOnPage = [
  { value: '5', label: 5 },
  { value: '10', label: 10 },
  { value: '15', label: 15 },
]

export const Default: Story = {
  render: args => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectOption, setSelectOption] = useState<number>(5)

    return (
      <>
        <Pagination
          {...args}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={selectOption}
          changeItemsPerPage={setSelectOption}
        />
      </>
    )
  },
  args: {
    pagesCount: 20,
    ListCountItemsShowOnPage,
  } as {
    pagesCount: number
    currentPage: number
    ListCountItemsShowOnPage: { label: number; value: string }[]
    itemsPerPage: number
    setCurrentPage?: ((page: number) => void) | undefined
    changeItemsPerPage?: ((count: number) => void) | undefined
  },
}
