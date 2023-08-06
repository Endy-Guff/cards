import { useState } from 'react'

import { Meta } from '@storybook/react'

import { ForgotPasswordFormSchema } from '../schemas.ts'

import { ForgotPassword } from './forgotPassword.tsx'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
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
