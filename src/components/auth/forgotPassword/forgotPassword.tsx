import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, Card, Typography } from '../../ui'
import { ControlledTextField } from '../../ui/controlled/controlledTextField/controlledTextField.tsx'
import { ForgotPasswordFormSchema, forgotPasswordSchema } from '../schemas.ts'

import s from './forgotPassword.module.scss'

type ForgotPasswordPropsType = {
  onSubmit: (data: ForgotPasswordFormSchema) => void
}

export const ForgotPassword: FC<ForgotPasswordPropsType> = ({ onSubmit: onSubmitCallback }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: ForgotPasswordFormSchema) => {
    onSubmitCallback(data)
  }

  return (
    <Card className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* RHF devTool */}
        <DevTool control={control} />
        {/* RHF devTool */}

        <Typography.Large className={s.title}>Forgot your password?</Typography.Large>

        <ControlledTextField
          control={control}
          name={'email'}
          label={'email'}
          defaultValue={''}
          errorMessage={errors.email?.message}
          className={s.textField}
        />

        <Typography.Body2 className={s.caption}>
          Enter your email address and we will send you further instructions{' '}
        </Typography.Body2>

        <Button className={s.btn} fullWidth={true} type="submit">
          Send Instructions
        </Button>

        <div className={s.descBlock}>
          <Typography.Body2 color={'var(--color-light-900)'}>
            Did you remember your password?
          </Typography.Body2>
          <Button className={s.link} variant={'link'} component={Link} to={'/sign-in'}>
            Try logging in
          </Button>
        </div>
      </form>
    </Card>
  )
}
