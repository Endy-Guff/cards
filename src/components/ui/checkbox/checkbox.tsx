import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'

import Check from '../../../assets/icons/components/check.tsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
  required?: boolean
  label?: string
  id?: string
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  checked,
  label,
  disabled = false,
  onChange,
  required,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <CheckboxRadix.Root
        className={s.checkboxRoot}
        defaultChecked
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        required={required}
        id={id}
      >
        {!checked && <Check checked={checked} disabled={disabled} />}
        <CheckboxRadix.Indicator className={s.checkboxIndicator}>
          <Check checked={checked} disabled={disabled} />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {label && (
        <label className={disabled ? s.label + ' ' + s.disabled : s.label} htmlFor="c1">
          {label}
        </label>
      )}
    </div>
  )
}
