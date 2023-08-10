import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'

import photo from '../../../assets/images/avatarImg.png'
import { PersonalInformationSchema } from '../schemas.ts'

import { PersonalInformation } from './personalInformation.tsx'

const meta = {
  title: 'Auth/PersonalInformation',
  component: PersonalInformation,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/personal-information' },
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [formData, setFormData] = useState<PersonalInformationSchema>({
      nickName: 'Ivan',
      file: photo,
    })

    const onSubmit = (data: PersonalInformationSchema) => {
      setFormData(data)
    }

    return (
      <>
        <PersonalInformation
          {...args}
          onSubmit={onSubmit}
          name={formData.nickName}
          avatarImg={formData.file as string}
        />
      </>
    )
  },
  args: {
    email: 'email@gm.com',
  } as Partial<{
    onSubmit: (data: { nickName: string; file?: unknown }) => void
    avatarImg: string
    name: string
    email: string
  }> & {
    avatarImg: string
    name: string
    email: string
    onSubmit?: ((data: { nickName: string; file?: unknown }) => void) | undefined
  },
}
