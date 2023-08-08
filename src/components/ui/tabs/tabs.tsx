import { FC, ReactNode } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'

import { Typography } from '../typography'

import s from './tabs.module.scss'
export type TabType = {
  value: string
  title: string
  disabled?: boolean
}

type TabsPropsType = {
  tabs: TabType[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children?: ReactNode
}
export const Tabs: FC<TabsPropsType> = ({ tabs, children, value, onValueChange, defaultValue }) => {
  return (
    <TabsRadix.Root
      className={s.root}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <TabsRadix.List className={s.list}>
        {tabs.map(tab => {
          return (
            <TabsRadix.Trigger
              className={s.trigger}
              value={tab.value}
              key={tab.value}
              disabled={tab.disabled}
            >
              {tab.title}
            </TabsRadix.Trigger>
          )
        })}
      </TabsRadix.List>
      {children}
    </TabsRadix.Root>
  )
}

type TabsContentPropsType = {
  value: string
  children: ReactNode
}
export const TabsContent: FC<TabsContentPropsType> = ({ value, children }) => {
  return (
    <TabsRadix.Content className={s.contentItem} value={value}>
      <Typography.Body1>{children}</Typography.Body1>
    </TabsRadix.Content>
  )
}
