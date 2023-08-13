import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { addCardSchema, AddCardSchema } from '../../../common/formSchemas/formSchemas.ts'
import { Modal, ModalButtonBlock, Size } from '../../../components'
import { ControlledTextField } from '../../../components/ui/controlled/controlledTextField/controlledTextField.tsx'

import s from './addCardModal.module.scss'

type AddCardModalPropsType = {
  open: boolean
  onClose: () => void
  onSubmitCallback: (data: AddCardSchema) => void
  size?: Size
}
export const AddCardModal: FC<AddCardModalPropsType> = ({
  open,
  onClose,
  onSubmitCallback,
  size,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddCardSchema>({
    resolver: zodResolver(addCardSchema),
  })
  const onSubmit = (data: AddCardSchema) => {
    onClose()
    onSubmitCallback(data)
  }

  return (
    <>
      <Modal open={open} title={'Add New Card'} closeModal={onClose} size={size}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            name={'question'}
            label={'Question'}
            defaultValue={''}
            errorMessage={errors.question?.message}
            className={s.textField}
          />
          <ControlledTextField
            control={control}
            name={'answer'}
            label={'Answer'}
            defaultValue={''}
            errorMessage={errors.question?.message}
            className={s.textField}
          />
          <ModalButtonBlock
            variant={'second'}
            firstButtonText={'Add New Card'}
            secondButtonText={'Cancel'}
            secondButtonCallback={onClose}
          />
        </form>
      </Modal>
    </>
  )
}
