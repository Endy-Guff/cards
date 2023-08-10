import { Meta, StoryObj } from '@storybook/react'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

import { CheckEmail } from './checkEmail.tsx'

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmail,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/check-email' },
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'example@ex.com',
  },
}
