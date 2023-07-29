import { FC } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import { Typography } from '../typography'

import s from './radioGroup.module.scss'

type Option = {
  label: string
  value: string
}
type RadioGroupPropsType = {
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}
export const RadioGroup: FC<RadioGroupPropsType> = ({
  value,
  disabled = false,
  onChange,
  options,
}) => {
  const mappedOptions = options.map(option => (
    <RadioGroupItem key={option.value} disabled={disabled} option={option} />
  ))

  return (
    <RadioGroupRadix.Root
      value={value}
      onValueChange={onChange}
      className={s.radioGroupRoot}
      disabled={disabled}
    >
      {mappedOptions}
    </RadioGroupRadix.Root>
  )
}

type RadioGroupItemProps = {
  option: Option
  disabled: boolean
}
const RadioGroupItem: FC<RadioGroupItemProps> = ({ option, disabled }) => {
  return (
    <div className={s.itemWrapper}>
      <RadioGroupRadix.Item className={s.item} value={option.value} id={option.value}>
        <RadioGroupRadix.Indicator className={s.indicator} />
      </RadioGroupRadix.Item>
      <label className={s.label} htmlFor={option.value}>
        <Typography.Body2 color={disabled ? 'var(--color-dark-300)' : 'var(--color-light-100)'}>
          {option.label}
        </Typography.Body2>
      </label>
    </div>
  )
}
