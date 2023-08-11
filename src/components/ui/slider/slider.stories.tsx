import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Slider } from './slider.tsx'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>
const min = 0
const max = 100

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState<number[]>([min, max])

    return (
      <>
        <Slider {...args} onChange={setValue} value={value} />
      </>
    )
  },
  args: {
    min,
    max,
    label: 'Label',
  } as Partial<{
    onChange: (numbers: number[]) => void
    value?: number[]
    min: number
    max: number
    label: string
  }> & {
    value: number[]
    min: number
    max: number
    label: string
    onChange?: ((numbers: number[]) => void) | undefined
  },
}
