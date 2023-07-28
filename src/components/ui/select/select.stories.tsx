import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Select } from './select.tsx'

const options: { label: string; value: string }[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // @ts-ignore
  render: args => {
    const [currentValue, setCurrentValue] = useState('')

    return (
      <>
        <Select
          label={'Select'}
          placeholder={'Select value'}
          options={options}
          onChange={setCurrentValue}
          value={currentValue}
        />
      </>
    )
  },
  args: {
    label: 'Select',
    placeholder: 'Select value',
    options,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Select',
    placeholder: 'Select value',
    options,
    disabled: true,
  },
}
