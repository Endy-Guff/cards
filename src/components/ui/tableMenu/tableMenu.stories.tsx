import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { TableMenu } from './tableMenu.tsx'

const meta = {
  title: 'Components/TableMenu',
  component: TableMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof TableMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [message, setMessage] = useState<string>('')
    const deleteCallback = (id: number) => {
      setMessage(`action: deleteCallback with id ${id}`)
    }
    const changeCallback = (id: number) => {
      setMessage(`action: changeCallback with id ${id}`)
    }
    const playCallback = (id: number) => {
      setMessage(`action: playCallback with id ${id}`)
    }

    return (
      <>
        <TableMenu
          {...args}
          deleteCallback={deleteCallback}
          changeCallback={changeCallback}
          playCallback={playCallback}
        />
        <div>{message}</div>
      </>
    )
  },
  args: {
    id: 22,
  },
}
