import { ComponentProps, ReactNode, KeyboardEvent, useState, FC } from 'react'
import * as React from 'react'

import { CloseIcon } from '../../../assets/icons/components/closeIcon.tsx'
import { SearchIcon } from '../../../assets/icons/components/searchIcon.tsx'
import { ShowIcon } from '../../../assets/icons/components/showIcon.tsx'
import { Typography } from '../typography'

import s from './textField.module.scss'

export type TextFieldProps = {
  value?: string | number
  label?: ReactNode
  errorMessage?: string
  iconStart?: ReactNode
  iconEnd?: ReactNode
  search?: boolean
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  onClearClick?: () => void
} & ComponentProps<'input'>

// НЕ УДАЛЯТЬ КОММЕНТ ПЕРЕД forwardRef - без него ломается tree shaking
export const TextField: FC<TextFieldProps> = ({
  label,
  onEnter,
  onKeyDown,
  className,
  errorMessage,
  iconEnd,
  iconStart,
  search,
  onClearClick,
  type: inputType = 'text',
  ...rest
}) => {
  const [type, setType] = useState<React.HTMLInputTypeAttribute>(inputType)
  const showPassword = () => {
    setType(type => (type === 'password' ? 'text' : 'password'))
  }
  const showError = !!errorMessage && errorMessage.length > 0

  if (search) {
    iconStart = <SearchIcon size={20} color={'var(--color-dark-100)'} disabled={rest.disabled} />
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === 'Enter') {
      onEnter(e)
    }
    onKeyDown?.(e)
  }
  const classNames = {
    root: `${s.box} ${className}`,
    label: s.label,
    input: `${s.input} ${showError && s.error} ${search && s.search}`,
    iconStart: s.iconStart,
    iconEnd: s.iconEnd,
    inputContainer: s.inputContainer,
    clearButton: s.clearButton,
    showButton: s.showButton,
    error: s.error,
  }

  const isShowClearButton = search && rest?.value?.toString().length! > 0
  const isShowPasswordButton = inputType === 'password' && rest?.value?.toString().length! > 0

  const dataIconStart = iconStart ? 'start' : ''
  const dataIconEnd = iconEnd || isShowClearButton ? 'end' : ''
  const dataIcon = dataIconStart + dataIconEnd

  return (
    <div className={classNames.root}>
      <label className={classNames.label} htmlFor="input">
        {label && label}
      </label>
      <div className={classNames.inputContainer}>
        {!!iconStart && <span className={classNames.iconStart}>{iconStart}</span>}
        <input
          className={classNames.input}
          type={type}
          data-icon={dataIcon}
          onKeyDown={handleKeyDown}
          id="input"
          {...rest}
        />
        {isShowClearButton && (
          <span className={classNames.clearButton} onClick={onClearClick}>
            {<CloseIcon size={16} color={'var(--color-light-100)'} disabled={rest.disabled} />}
          </span>
        )}
        {isShowPasswordButton && (
          <span className={classNames.showButton} onClick={showPassword}>
            <ShowIcon size={20} color={'var(--color-light-100)'} disabled={rest.disabled} />
          </span>
        )}
        {!!iconEnd && <span className={classNames.iconEnd}>{iconEnd}</span>}
      </div>

      {showError && (
        <Typography.Caption className={classNames.error}>{errorMessage}</Typography.Caption>
      )}
    </div>
  )
}
