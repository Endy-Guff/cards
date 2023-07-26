import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Checkbox } from './checkbox.tsx'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} as Meta<typeof Checkbox>

type ArgsType = {
  label: string
  disabled: boolean
}
export const Default = {
  render: (args: ArgsType) => {
    const [checked, setChecked] = useState(true)

    return <Checkbox {...args} checked={checked} onChange={setChecked} />
  },

  args: {
    label: 'Click here',
    disabled: false,
  },
}
