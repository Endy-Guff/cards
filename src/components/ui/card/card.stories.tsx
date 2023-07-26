import { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: false,
    },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const CardWithContent: Story = {
  args: {
    children: 'Card with content example',
  },
}
