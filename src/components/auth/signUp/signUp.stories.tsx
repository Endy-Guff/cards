import { useState } from 'react'

import { Meta } from '@storybook/react'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

import { SignUpFormSchema } from '../schemas.ts'

import { SignUp } from './signUp.tsx'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/sign-up' },
    }),
  },
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
