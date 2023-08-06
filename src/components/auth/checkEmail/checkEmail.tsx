import { FC } from 'react'

import image from '../../../assets/images/Forms/emailCheck.png'
import { Button, Card, Typography } from '../../ui'

import s from './checkEmail.module.scss'

type CheckEmailPropsType = {
  email: string
}

export const CheckEmail: FC<CheckEmailPropsType> = ({ email }) => {
  return (
    <Card className={s.wrapper}>
      <Typography.Large className={s.title}>Check Email</Typography.Large>
      <img className={s.img} src={image} alt="email send icon" />
      <Typography.Body2 className={s.caption} color={'var(--color-light-900)'}>
        We’ve sent an Email with instructions to {email}
      </Typography.Body2>
      <Button className={s.btn} fullWidth={true}>
        Back to Sign In
      </Button>
    </Card>
  )
}
