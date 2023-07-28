import { FC } from 'react'

import { LogOutIcon } from '../../../assets/icons/components/logOutIcon.tsx'
import { ProfileIcon } from '../../../assets/icons/components/profileIcon.tsx'
import logo from '../../../assets/images/Header/Logo.svg'
import { Button } from '../button'
import { Dropdown, DropdownItem } from '../dropDown'
import { Typography } from '../typography'

import s from './header.module.scss'

type HeaderPropsType = {
  isLoggedIn: boolean
  name?: string
  email?: string
  avaUrl?: string
}
export const Header: FC<HeaderPropsType> = props => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.inner}>
          <img src={logo} alt="logo" />
          <AuthBlock {...props} />
        </div>
      </div>
    </div>
  )
}

type AuthBlockPropsType = {
  isLoggedIn: boolean
  name?: string
  email?: string
  avaUrl?: string
}
const AuthBlock: FC<AuthBlockPropsType> = ({ isLoggedIn, name, email, avaUrl }) => {
  return (
    <div className={s.authBlockWrapper}>
      {isLoggedIn ? (
        <Dropdown
          trigger={
            <div className={s.authBlock}>
              <Typography.Subtitle1 className={s.name}>{name}</Typography.Subtitle1>
              <img
                src={avaUrl}
                alt="avatar"
                style={{ width: '36', height: '36', borderRadius: '50%' }}
              />
            </div>
          }
        >
          <>
            <DropdownItem onSelect={() => {}}>
              <div className={s.dropdownAvaBlock}>
                <img
                  src={avaUrl}
                  alt="avatar"
                  style={{ height: '36px', width: '36px', borderRadius: '50%' }}
                />
                <div className={s.dropdownTextBox}>
                  <Typography.Subtitle2>{name}</Typography.Subtitle2>
                  <Typography.Caption>{email}</Typography.Caption>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem onSelect={() => {}}>
              <ProfileIcon size={16} color={'var(--color-light-100)'} />
              <Typography.Caption>My Profile</Typography.Caption>
            </DropdownItem>
            <DropdownItem onSelect={() => {}}>
              <LogOutIcon size={16} color={'var(--color-light-100)'} />
              <Typography.Caption>Sign Out</Typography.Caption>
            </DropdownItem>
          </>
        </Dropdown>
      ) : (
        <Button>Sign In</Button>
      )}
    </div>
  )
}
