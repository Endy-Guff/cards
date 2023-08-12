import { FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { CloseIcon } from '../../../assets/icons/components/closeIcon.tsx'
import { Button } from '../button'

import s from './modal.module.scss'
export type Size = 'sm' | 'md' | 'lg'
type ModalPropsType = {
  size?: Size
  showHeader?: boolean
  showCloseButton?: boolean
  open: boolean
  title: string
  children: ReactNode
  closeModal: () => void
}

export const Modal: FC<ModalPropsType> = ({
  closeModal,
  children,
  title,
  showCloseButton = true,
  open,
  size = 'md',
  showHeader = true,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={closeModal}>
      {open && (
        <Dialog.Portal>
          <Dialog.Overlay className={s.overlay} />
          <Dialog.Content className={`${s.inner} ${getSizeClassName(size)}`}>
            {showHeader && (
              <div className={s.header}>
                <div className={s.headerInner}>
                  <Dialog.Title>{title}</Dialog.Title>
                  {showCloseButton && (
                    <Dialog.Close>
                      <CloseIcon size={24} color={'var(--color-light-100)'} />
                    </Dialog.Close>
                  )}
                </div>
              </div>
            )}
            <div className={s.content}>
              <div className={s.contentInner}>{children}</div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  )
}

type ModalButtonBlockPropsType = {
  variant: 'first' | 'second'
  firstButtonText: string
  secondButtonText?: string
  firstButtonCallback?: () => void
  secondButtonCallback?: () => void
}
export const ModalButtonBlock: FC<ModalButtonBlockPropsType> = ({
  secondButtonText,
  firstButtonText,
  variant,
  firstButtonCallback,
  secondButtonCallback,
}) => {
  return (
    <div className={`${s.buttonsContainer} ${variant === 'first' && s.oneButton}`}>
      {variant === 'first' && (
        <Button onClick={firstButtonCallback} type={'submit'} variant={'primary'}>
          {firstButtonText}
        </Button>
      )}
      {variant === 'second' && (
        <>
          <Button onClick={secondButtonCallback} variant={'secondary'}>
            {secondButtonText}
          </Button>
          <Button onClick={firstButtonCallback} type={'submit'} variant={'primary'}>
            {firstButtonText}
          </Button>
        </>
      )}
    </div>
  )
}

function getSizeClassName(size: Size) {
  if (size === 'sm') return s.sm
  if (size === 'md') return s.md
  if (size === 'lg') return s.lg
}
