import { Meta, StoryObj } from '@storybook/react'

import { Typography } from '../typography'

import { PagesHeader } from './pagesHeader.tsx'

const meta = {
  title: 'Components/PagesHeader',
  component: PagesHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof PagesHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    buttonTitle: 'Button',
    buttonCallback: () => {},
    children: (
      <>
        <Typography.Large>Title</Typography.Large>
      </>
    ),
  },
}
