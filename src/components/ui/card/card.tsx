import { ComponentPropsWithoutRef, ReactNode } from 'react'

import s from './card.module.scss'

type CardPropsType = {
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>
export const Card = (
  props: CardPropsType & Omit<ComponentPropsWithoutRef<'div'>, keyof CardPropsType>
) => {
  const { children, className, ...restProps } = props

  return (
    <div className={`${s.wrapper} ${className}`} {...restProps}>
      {children}
    </div>
  )
}
