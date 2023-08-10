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
  } as {
    pagesCount: number
    currentPage: number
    itemsPerPage: number
    setCurrentPage?: ((page: number) => void) | undefined
    changeItemsPerPage?: ((count: number) => void) | undefined
  },
}
