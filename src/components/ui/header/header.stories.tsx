import { Meta, StoryObj } from '@storybook/react'

import avatar from '../../../assets/images/Header/avatarExample.jpg'

import { Header } from './header.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const NoLoggedIn: Story = {
  args: {
    isLoggedIn: false,
    name: 'Ivan',
    email: 'ivan@gmail.com',
    avaUrl: avatar,
  },
}

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    name: 'Ivan',
    email: 'ivan@gmail.com',
    avaUrl: avatar,
  },
}
