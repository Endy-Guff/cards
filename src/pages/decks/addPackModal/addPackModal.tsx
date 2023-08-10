import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AddPackSchema, addPackSchema } from '../../../common/formSchemas/formSchemas.ts'
import { ControlledCheckbox, Modal, ModalButtonBlock } from '../../../components'
import { ControlledTextField } from '../../../components/ui/controlled/controlledTextField/controlledTextField.tsx'

import s from './addPackModal.module.scss'

type AddPackModalPropsType = {
  open: boolean
  onClose: () => void
  onSubmitCallback: (data: AddPackSchema) => void
}
export const AddPackModal: FC<AddPackModalPropsType> = ({ open, onClose, onSubmitCallback }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddPackSchema>({
    resolver: zodResolver(addPackSchema),
  })
  const onSubmit = (data: AddPackSchema) => {
    onClose()
    onSubmitCallback(data)
  }

  return (
    <>
      <Modal open={open} title={'Add New Pack'} closeModal={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            name={'namePack'}
            label={'Name Pack'}
            defaultValue={''}
            errorMessage={errors.namePack?.message}
            className={s.textField}
          />
          <ControlledCheckbox
            name={'private'}
            control={control}
            label={'Private pack'}
            defaultValue={false}
            className={s.checkbox}
          />
          <ModalButtonBlock
            variant={'second'}
            firstButtonText={'Add New Pack'}
            secondButtonText={'Cancel'}
            secondButtonCallback={onClose}
          />
        </form>
      </Modal>
    </>
  )
}
