import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Typography } from '../typography'

import { RadioGroup } from './radioGroup.tsx'

const options: { label: string; value: string }[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
]

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // @ts-ignore
  render: args => {
    const [currentValue, setCurrentValue] = useState('')

    return (
      <>
        <RadioGroup options={options} value={currentValue} onChange={setCurrentValue} />
        <Typography.Subtitle1 mt={10}>Current Value: {currentValue}</Typography.Subtitle1>
      </>
    )
  },
  args: {
    options,
  },
}

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
  },
}
