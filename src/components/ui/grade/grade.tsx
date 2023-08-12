import { FC } from 'react'

import { EmptyStar } from '../../../assets/icons/components/emptyStar.tsx'
import { FilledStar } from '../../../assets/icons/components/filledStar.tsx'

import s from './grade.module.scss'

type GradePropsType = {
  grade: number
}
export const Grade: FC<GradePropsType> = ({ grade }) => {
  // @ts-ignore
  const mappedGrade = [...Array(5)].map((el, i) => {
    return i + 1 <= grade ? <FilledStar /> : <EmptyStar />
  })

  return <div className={s.wrapper}>{mappedGrade}</div>
}
