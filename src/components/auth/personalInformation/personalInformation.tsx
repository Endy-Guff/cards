import { FC, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { EditIcon } from '../../../assets/icons/components/editIcon.tsx'
import { LogOutIcon } from '../../../assets/icons/components/logOutIcon.tsx'
import { Avatar, Button, Card, Typography } from '../../ui'
import { ControlledFileInput } from '../../ui/controlled/controlledFileInput/controlledFileInput.tsx'
import { ControlledTextField } from '../../ui/controlled/controlledTextField/controlledTextField.tsx'
import { personalInformationSchema, PersonalInformationSchema } from '../schemas.ts'

import s from './personalInformation.module.scss'

type PersonalInformationPropsType = {
  onSubmit: (data: PersonalInformationSchema) => void
  avatarImg: string
  name: string
  email: string
}
export const PersonalInformation: FC<PersonalInformationPropsType> = ({
  onSubmit: onSubmitCallback,
  avatarImg,
  name,
  email,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<any>(avatarImg)
  const setAvatarCallback = (file: File) => {
    let reader = new FileReader()

    reader.onload = e => {
      setAvatar(e.target?.result)
    }
    reader.readAsDataURL(file)
  }
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PersonalInformationSchema>({
    resolver: zodResolver(personalInformationSchema),
  })
  const onSubmit = (data: PersonalInformationSchema) => {
    if (data.file === undefined) {
      onSubmitCallback({ ...data, file: avatarImg })
    } else onSubmitCallback(data)
    if (editMode) setEditMode(false)
  }

  const changeEditMode = () => {
    setEditMode(!editMode)
  }

  return (
    <Card className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* RHF devTool */}
        <DevTool control={control} />
        {/* RHF devTool */}
        <Typography.Large className={s.title}>Personal Information</Typography.Large>
        <Avatar className={s.avatar} avatarImg={avatar} editMode={true} size={96}>
          <ControlledFileInput
            control={control}
            name={'file'}
            id={'fileInput'}
            changeEditMode={setEditMode}
            setAvatar={setAvatarCallback}
          />
        </Avatar>
        {!editMode ? (
          <div className={s.informationBlock}>
            <div className={s.name}>
              <Typography.H1>{name}</Typography.H1>
              <button className={s.btnName} onClick={changeEditMode}>
                <EditIcon color={'var(--color-light-100)'} size={16} />
              </button>
            </div>
            <Typography.Body2 className={s.email} color={'var(--color-dark-100)'}>
              {email}
            </Typography.Body2>
            <Button className={s.logOutBtn} variant={'secondary'}>
              <LogOutIcon size={16} color={'var(--color-light-100)'} />
              <Typography.Subtitle2>Logout</Typography.Subtitle2>
            </Button>
          </div>
        ) : (
          <>
            <ControlledTextField
              control={control}
              name={'nickName'}
              label={'Nickname'}
              defaultValue={name}
              errorMessage={errors.nickName?.message}
              className={s.textField}
            />
            <Button className={s.btn} fullWidth={true} type="submit">
              <Typography.Subtitle2>Save Changes</Typography.Subtitle2>
            </Button>
          </>
        )}
      </form>
    </Card>
  )
}
