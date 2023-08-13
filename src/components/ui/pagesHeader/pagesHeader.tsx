import { FC, ReactNode } from 'react'

import { Button } from '../button'

import s from './pagesHeader.module.scss'

type PagesHeaderPropsType = {
  buttonCallback: () => void
  children: ReactNode
  buttonTitle: string
  showButton?: boolean
}
export const PagesHeader: FC<PagesHeaderPropsType> = ({
  buttonCallback,
  children,
  buttonTitle,
  showButton = true,
}) => {
  return (
    <div className={s.wrapper}>
      {children}
      {showButton && (
        <Button variant={'primary'} onClick={buttonCallback}>
          {buttonTitle}
        </Button>
      )}
    </div>
  )
}
