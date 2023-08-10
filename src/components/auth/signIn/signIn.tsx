import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, Card, ControlledCheckbox, Typography } from '../../ui'
import { ControlledTextField } from '../../ui/controlled/controlledTextField/controlledTextField.tsx'
import { SignInFormSchema, signInSchema } from '../schemas.ts'

import s from './signIn.module.scss'
type SignInPropsType = {
  onSubmit: (data: SignInFormSchema) => void
}

export const SignIn: FC<SignInPropsType> = ({ onSubmit: onSubmitCallback }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
  })
  const onSubmit = (data: SignInFormSchema) => {
    onSubmitCallback(data)
  }

  return (
    <Card className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* RHF devTool */}
        <DevTool control={control} />
        {/* RHF devTool */}

        <Typography.Large className={s.title}>Sign In</Typography.Large>

        <ControlledTextField
          control={control}
          name={'email'}
          label={'email'}
          defaultValue={''}
          errorMessage={errors.email?.message}
          className={s.textField}
        />
        <ControlledTextField
          control={control}
          name={'password'}
          label={'password'}
          type={'password'}
          defaultValue={''}
          errorMessage={errors.password?.message}
          className={s.textField}
        />
        <ControlledCheckbox
          name={'rememberMe'}
          control={control}
          label={'rememberMe'}
          defaultValue={false}
          className={s.checkbox}
        />

        <div className={s.forgot}>
          <Typography.Body2>Forgot Password?</Typography.Body2>
        </div>
        <Button className={s.btn} fullWidth={true} type="submit">
          Sign In
        </Button>
        <div className={s.descBlock}>
          <Typography.Body2 color={'var(--color-light-900)'}>
            Don&apos;t have an account?
          </Typography.Body2>
          <Button className={s.link} variant={'link'} component={Link} to={'/sign-up'}>
            Sign Up
          </Button>
        </div>
      </form>
    </Card>
  )
}
