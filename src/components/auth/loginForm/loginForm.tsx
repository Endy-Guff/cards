import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ControlledCheckbox } from '../../ui'
import { ControlledTextField } from '../../ui/controlled/controlledTextField/controlledTextField.tsx'

type LoginFormSchema = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export const LoginForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: LoginFormSchema) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* RHF devTool */}
      <DevTool control={control} />
      {/* RHF devTool */}

      <ControlledTextField control={control} name={'email'} label={'email'} defaultValue={''} />
      {errors.email?.message}
      <ControlledTextField
        control={control}
        name={'password'}
        label={'password'}
        type={'password'}
        defaultValue={''}
      />
      {errors.password?.message}
      <ControlledCheckbox
        name={'rememberMe'}
        control={control}
        label={'rememberMe'}
        defaultValue={false}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
