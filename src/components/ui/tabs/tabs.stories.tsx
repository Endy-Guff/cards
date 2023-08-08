import { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent } from './tabs.tsx'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { value: '1 tab', title: '1 tab', disabled: false },
      { value: '2 tab', title: '2 tab', disabled: false },
      { value: '3 tab', title: '3 tab', disabled: false },
    ],
    defaultValue: '1 tab',
    children: (
      <>
        <TabsContent value={'1 tab'}>1 tab content</TabsContent>
        <TabsContent value={'2 tab'}>2 tab content</TabsContent>
        <TabsContent value={'3 tab'}>3 tab content</TabsContent>
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    tabs: [
      { value: '1 tab', title: '1 tab', disabled: false },
      { value: '2 tab', title: '2 disabled', disabled: true },
      { value: '3 tab', title: '3 disabled', disabled: true },
    ],
    defaultValue: '1 tab',
    children: (
      <>
        <TabsContent value={'1 tab'}>1 tab content</TabsContent>
        <TabsContent value={'2 tab'}>2 tab content</TabsContent>
        <TabsContent value={'3 tab'}>3 tab content</TabsContent>
      </>
    ),
  },
}
