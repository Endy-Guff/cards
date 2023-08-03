import { FC, useState } from 'react'

// @ts-ignore
import * as SelectRadix from '@radix-ui/react-select'

import { DownIcon } from '../../../assets/icons/components/downIcon.tsx'
import { Typography } from '../typography'

import s from './select.module.scss'

type Option = { label: string; value: string } | { label: number; value: string }
type SelectPropsType = {
  placeholder: string
  options: Option[]
  onChange?: (value: string) => void
  value?: string
  label?: string
  disabled?: boolean
  width?: number
  height?: number
}
export const Select: FC<SelectPropsType> = ({
  placeholder,
  disabled = false,
  options,
  label,
  onChange,
  value,
  width,
  height,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const mappedOptions = options.map(op => {
    return <SelectItem key={op.value} option={op} width={width} height={height} />
  })
  const disabledClass = disabled ? s.disabled : ''

  return (
    <div className={`${s.wrapper} ${disabledClass}`}>
      <SelectRadix.Root
        onValueChange={onChange}
        value={value ? value : undefined}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
      >
        <span className={`${s.label} ${disabledClass}`}>
          <Typography.Body2 color={disabled ? 'var(--color-dark-300)' : 'var(--color-dark-100)'}>
            {label}
          </Typography.Body2>
        </span>
        <SelectRadix.Trigger className={s.trigger} style={{ width: width, height: height }}>
          <SelectRadix.Value placeholder={<Typography.Body1>{placeholder}</Typography.Body1>} />
          <SelectRadix.Icon className={`${s.icon} ${open && s.iconOpen}`}>
            <DownIcon size={16} color={'var(--color-light-100)'} disabled={disabled} />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
          <SelectRadix.Content position={'popper'} className={s.content} style={{ width: width }}>
            <SelectRadix.Viewport>
              <SelectRadix.Group>{mappedOptions}</SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

type SelectItemPropsType = {
  option: Option
  width?: number
  height?: number
}
const SelectItem: FC<SelectItemPropsType> = ({ option, width, height }) => {
  const { label, value } = option

  return (
    <SelectRadix.Item
      value={value.toString()}
      className={s.option}
      style={{ width: width, height: height }}
    >
      <SelectRadix.ItemText>
        <Typography.Body1>{label}</Typography.Body1>
      </SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}
