import { useState } from 'react'

import type { Meta } from '@storybook/react'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

import { NewPasswordSchema } from '../schemas.ts'

import { NewPassword } from './newPassword.tsx'

const meta = {
  title: 'Auth/NewPassword',
  component: NewPassword,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/new-password' },
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewPassword>

export default meta

export const Default = {
  render: () => {
    const [formData, setFormData] = useState<NewPasswordSchema>({
      password: '',
    })

    const onSubmit = (data: NewPasswordSchema) => {
      setFormData(data)
    }

    return (
      <>
        <NewPassword onSubmit={onSubmit} />

        <div>{formData.password}</div>
      </>
    )
  },
}
