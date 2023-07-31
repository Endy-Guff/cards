import { useState } from 'react'

import { Meta } from '@storybook/react'

import { TextField } from './textField.tsx'

export default {
  title: 'Components/Text Field',
  component: TextField,
  tags: ['autodocs'],
} as Meta<typeof TextField>

export const Default = {
  args: {
    label: 'Some label',
    placeholder: 'Placeholder text',
    error: false,
    disabled: false,
  },
}

export const Invalid = {
  // @ts-ignore
  render: args => {
    return <TextField value="some value" label="some label" errorMessage="Error message" />
  },
}

export const Password = {
  // @ts-ignore
  render: args => {
    const [text, setText] = useState('')

    return (
      <>
        <TextField {...args} value={text} onChange={e => setText(e.currentTarget.value)} />
      </>
    )
  },
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
  },
}

export const Search = {
  // @ts-ignore
  render: args => {
    const [text, setText] = useState('')

    return (
      <>
        <TextField
          {...args}
          value={text}
          onChange={e => setText(e.currentTarget.value)}
          onClearClick={() => setText('')}
        />
      </>
    )
  },
  args: {
    label: 'Some label',
    placeholder: 'Search...',
    search: true,
  },
}
