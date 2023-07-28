import { FC, ReactNode, useState } from 'react'

// @ts-ignore
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDown.module.scss'

type DropdownPropsType = {
  trigger: ReactNode
  children: ReactNode
}
export const Dropdown: FC<DropdownPropsType> = ({ trigger, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button className={s.triggerBtn} aria-label="Customise options">
          {trigger}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} sideOffset={5} align="end">
          <DropdownMenu.Arrow asChild className={s.arrowBox}>
            <div className={s.arrow} />
          </DropdownMenu.Arrow>
          <div className={s.itemBox}>{children}</div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
type DropdownItemPropsType = {
  onSelect: () => void
  icon?: ReactNode
  children: ReactNode
}
export const DropdownItem: FC<DropdownItemPropsType> = ({ children, onSelect, icon }) => {
  return (
    <>
      <DropdownMenu.Item
        className={s.itemWrapper}
        onSelect={onSelect}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}
      >
        {icon && <div className={s.icon}>{icon}</div>} {children}
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={s.separator} />
    </>
  )
}
