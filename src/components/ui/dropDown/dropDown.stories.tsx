import { Meta } from '@storybook/react'

import { CloseIcon } from '../../../assets/icons/components/closeIcon.tsx'
import { ShowIcon } from '../../../assets/icons/components/showIcon.tsx'

import { Dropdown, DropdownItem } from './dropDown.tsx'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} as Meta<typeof Dropdown>

export const Default = {
  //@ts-ignore
  render: args => {
    return <Dropdown {...args} />
  },

  args: {
    trigger: <div>123</div>,
    children: (
      <>
        <DropdownItem
          icon={<CloseIcon size={20} color={'var(--color-light-100)'} />}
          onSelect={() => {}}
        >
          Text 1
        </DropdownItem>
        <DropdownItem
          icon={<ShowIcon size={20} color={'var(--color-light-100)'} />}
          onSelect={() => {}}
        >
          Text 2
        </DropdownItem>
      </>
    ),
  },
}
