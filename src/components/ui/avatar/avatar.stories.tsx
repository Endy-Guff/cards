import { Meta, StoryObj } from '@storybook/react'

import photo from '../../../assets/images/avatarImg.png'

import { Avatar } from './avatar.tsx'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    // const [value, setValue] = useState<number[]>([min, max])

    return (
      <>
        <Avatar {...args}>
          <input id={'fileInput'} type="text" />
        </Avatar>
      </>
    )
  },
  args: {
    size: 96,
    avatarImg: photo,
    editMode: true,
  },
}
