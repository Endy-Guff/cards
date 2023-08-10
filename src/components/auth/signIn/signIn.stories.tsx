import { useState } from 'react'

import type { Meta } from '@storybook/react'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

import { SignInFormSchema } from '../schemas.ts'

import { SignIn } from './signIn.tsx'

const meta = {
  title: 'Auth/SignIn',
  component: SignIn,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/sign-in' },
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>

export default meta

export const Default = {
  render: () => {
    const [formData, setFormData] = useState<SignInFormSchema>({
      email: '',
      password: '',
      rememberMe: false,
    })

    const onSubmit = (data: SignInFormSchema) => {
      setFormData(data)
    }

    return (
      <>
        <SignIn onSubmit={onSubmit} />

        <div>{formData.email}</div>
        <div>{formData.password}</div>
        <div>{formData.rememberMe && 'true'}</div>
      </>
    )
  },
}
