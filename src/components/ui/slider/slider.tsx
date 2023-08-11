import { FC } from 'react'

// @ts-ignore
import * as SliderRadix from '@radix-ui/react-slider'

import { TextField } from '../textField'
import { Typography } from '../typography'

import s from './slider.module.scss'

type SliderPropsType = {
  onChange: (numbers: number[]) => void
  value: number[]
  min: number
  max: number
  label?: string
}
export const Slider: FC<SliderPropsType> = ({ onChange, label, min, max, value }) => {
  const changeIndicator = (payload: { type: 'min' | 'max'; value: number }) => {
    switch (payload.type) {
      case 'min':
        if (onChange) {
          onChange([payload.value, value![1]])
        }
        break
      case 'max':
        if (onChange) {
          onChange([value![0], payload.value])
        }
        break
    }
  }

  return (
    <div className={s.wrapper}>
      {label && (
        <span className={s.label}>
          <Typography.Body2>{label}</Typography.Body2>
        </span>
      )}
      <div className={s.indicator}>
        <TextField
          style={{ textAlign: 'center' }}
          className={s.indicatorInput}
          value={value![0] <= min ? min : value![0]}
          onChange={e => changeIndicator({ type: 'min', value: +e.currentTarget.value })}
        />
      </div>
      <SliderRadix.Root
        className={s.root}
        onValueChange={onChange}
        value={value}
        min={min}
        max={max}
      >
        <SliderRadix.Track className={s.track}>
          <SliderRadix.Range className={s.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.thumb} />
        <SliderRadix.Thumb className={s.thumb} />
      </SliderRadix.Root>
      <div className={s.indicator}>
        <TextField
          style={{ textAlign: 'center' }}
          className={s.indicatorInput}
          value={value![1] >= max ? max : value![1]}
          onChange={e => changeIndicator({ type: 'max', value: +e.currentTarget.value })}
        />
      </div>
    </div>
  )
}
