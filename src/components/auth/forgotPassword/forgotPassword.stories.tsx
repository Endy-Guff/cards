import { useState } from 'react'

import { Meta } from '@storybook/react'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

import { ForgotPasswordFormSchema } from '../schemas.ts'

import { ForgotPassword } from './forgotPassword.tsx'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/forgot-password' },
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPassword>

export default meta

export const Default = {
  render: () => {
    const [formData, setFormData] = useState<ForgotPasswordFormSchema>({
      email: '',
    })

    const onSubmit = (data: ForgotPasswordFormSchema) => {
      setFormData(data)
    }

    return (
      <>
        <ForgotPassword onSubmit={onSubmit} />

        <div>{formData.email}</div>
      </>
    )
  },
}
