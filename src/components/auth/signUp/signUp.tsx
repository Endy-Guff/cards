import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '../../ui'
import { ControlledTextField } from '../../ui/controlled/controlledTextField/controlledTextField.tsx'
import { SignUpFormSchema, signUpSchema } from '../schemas.ts'

import s from './signUp.module.scss'
type SignUpPropsType = {
  onSubmit: (data: SignUpFormSchema) => void
}

export const SignUp: FC<SignUpPropsType> = ({ onSubmit: onSubmitCallback }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = (data: SignUpFormSchema) => {
    onSubmitCallback(data)
  }

  return (
    <Card className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* RHF devTool */}
        <DevTool control={control} />
        {/* RHF devTool */}

        <Typography.Large className={s.title}>Sign Up</Typography.Large>

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

        <ControlledTextField
          control={control}
          name={'confirmPassword'}
          label={'Confirm Password'}
          type={'password'}
          defaultValue={''}
          errorMessage={errors.confirmPassword?.message}
          className={s.textField}
        />

        <Button className={s.btn} fullWidth={true} type="submit">
          Submit
        </Button>
        <div className={s.descBlock}>
          <Typography.Body2 color={'var(--color-light-900)'}>
            Already have an account?
          </Typography.Body2>
          <Button variant={'link'}>Sign Up</Button>
        </div>
      </form>
    </Card>
  )
}