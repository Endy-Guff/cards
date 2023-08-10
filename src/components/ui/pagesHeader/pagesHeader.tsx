import { FC, ReactNode } from 'react'

import { Button } from '../button'

import s from './pagesHeader.module.scss'

type PagesHeaderPropsType = {
  buttonCallback: () => void
  children: ReactNode
  buttonTitle: string
}
export const PagesHeader: FC<PagesHeaderPropsType> = ({
  buttonCallback,
  children,
  buttonTitle,
}) => {
  return (
    <div className={s.wrapper}>
      {children}
      <Button variant={'primary'} onClick={buttonCallback}>
        {buttonTitle}
      </Button>
    </div>
  )
}
