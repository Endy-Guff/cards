import { FC, ReactNode } from 'react'

import { DeleteIcon } from '../../../assets/icons/components/deleteIcon.tsx'
import { DotsIcon } from '../../../assets/icons/components/dotsIcon.tsx'
import { EditIcon } from '../../../assets/icons/components/editIcon.tsx'
import { PlayIcon } from '../../../assets/icons/components/playIcon.tsx'
import { Button } from '../button'
import { Dropdown, DropdownItem } from '../dropDown'

import s from './pagesHeader.module.scss'

type PagesHeaderPropsType = {
  buttonCallback: () => void
  children: ReactNode
  buttonTitle: string
  showButton?: boolean
  showDropDown?: boolean
  learnCallback?: () => void
  editCallback?: () => void
  deleteCallback?: () => void
}
export const PagesHeader: FC<PagesHeaderPropsType> = ({
  buttonCallback,
  children,
  buttonTitle,
  showButton = true,
  showDropDown = false,
  learnCallback,
  editCallback,
  deleteCallback,
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.titleBlock}>
        {children}
        {showDropDown && (
          <Dropdown trigger={<DotsIcon size={24} />}>
            <>
              <DropdownItem
                icon={<PlayIcon size={20} color={'var(--color-light-100)'} />}
                onSelect={learnCallback!}
              >
                Learn
              </DropdownItem>
              <DropdownItem
                icon={<EditIcon size={20} color={'var(--color-light-100)'} />}
                onSelect={editCallback!}
              >
                Edit
              </DropdownItem>
              <DropdownItem
                icon={<DeleteIcon size={20} color={'var(--color-light-100)'} />}
                onSelect={deleteCallback!}
              >
                Delete
              </DropdownItem>
            </>
          </Dropdown>
        )}
      </div>
      {showButton && (
        <Button variant={'primary'} onClick={buttonCallback}>
          {buttonTitle}
        </Button>
      )}
    </div>
  )
}
