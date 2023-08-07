import { FC, ReactNode } from 'react'

import { EditIcon } from '../../../assets/icons/components/editIcon.tsx'

import s from './avatar.module.scss'

type AvatarPropsType = {
  avatarImg: string
  children?: ReactNode
  editMode: boolean
  size: number
  className: string
}
export const Avatar: FC<AvatarPropsType> = ({ avatarImg, className, editMode, children, size }) => {
  return (
    <div className={`${s.wrapper} ${className}`} style={{ width: size, height: size }}>
      <img
        className={s.profilePhoto}
        src={avatarImg}
        alt="avatar"
        style={{ width: size, height: size }}
      />
      <div className={s.inputBox}>
        {editMode && (
          <label className={s.label} htmlFor={'fileInput'}>
            <EditIcon color={'var(--color-light-100)'} size={16} />
          </label>
        )}
        {children}
      </div>
    </div>
  )
}
