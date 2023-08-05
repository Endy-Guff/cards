import { useState } from 'react'

import { Meta } from '@storybook/react'

import { SignUpFormSchema } from '../schemas.ts'

import { SignUp } from './signUp.tsx'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta

export const Default = {
  render: () => {
    const [formData, setFormData] = useState<SignUpFormSchema>({
      email: '',
      password: '',
      confirmPassword: '',
    })

    const onSubmit = (data: SignUpFormSchema) => {
      setFormData(data)
    }

    return (
      <>
        <SignUp onSubmit={onSubmit} />

        <div>{formData.email}</div>
        <div>{formData.password}</div>
        <div>{formData.confirmPassword}</div>
      </>
    )
  },
}
