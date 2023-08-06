import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '../../ui'
import { ControlledTextField } from '../../ui/controlled/controlledTextField/controlledTextField.tsx'
import { NewPasswordSchema, newPasswordSchema } from '../schemas.ts'

import s from './newPassword.module.scss'

type NewPasswordPropsType = {
  onSubmit: (data: NewPasswordSchema) => void
}
export const NewPassword: FC<NewPasswordPropsType> = ({ onSubmit: callback }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<NewPasswordSchema>({ resolver: zodResolver(newPasswordSchema) })

  const onSubmit = (data: NewPasswordSchema) => {
    callback(data)
  }

  return (
    <Card className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* RHF devTool */}
        <DevTool control={control} />
        {/* RHF devTool */}

        <Typography.Large className={s.title}>Create new password</Typography.Large>

        <ControlledTextField
          control={control}
          name={'password'}
          label={'password'}
          type={'password'}
          defaultValue={''}
          errorMessage={errors.password?.message}
          className={s.textField}
        />

        <Typography.Body2 className={s.caption} color={'var(--color-light-900)'}>
          Create new password and we will send you further instructions to email
        </Typography.Body2>

        <Button className={s.btn} fullWidth={true} type="submit">
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
