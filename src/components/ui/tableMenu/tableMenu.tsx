import { FC } from 'react'

import { DeleteIcon } from '../../../assets/icons/components/deleteIcon.tsx'
import { EditIcon } from '../../../assets/icons/components/editIcon.tsx'
import { PlayIcon } from '../../../assets/icons/components/playIcon.tsx'

import s from './tableMenu.module.scss'

type TableMenuPropsType = {
  id: number
  deleteCallback: (id: number) => void
  changeCallback: (id: number) => void
  playCallback: (id: number) => void
}

export const TableMenu: FC<TableMenuPropsType> = ({
  id,
  deleteCallback,
  playCallback,
  changeCallback,
}) => {
  return (
    <div className={s.wrapper}>
      <button className={s.btn} onClick={() => playCallback(id)}>
        <PlayIcon size={16} color={'var(--color-light-100)'} />
      </button>
      <button className={s.btn} onClick={() => changeCallback(id)}>
        <EditIcon size={16} color={'var(--color-light-100)'} />
      </button>
      <button className={s.btn} onClick={() => deleteCallback(id)}>
        <DeleteIcon size={16} color={'var(--color-light-100)'} />
      </button>
    </div>
  )
}
