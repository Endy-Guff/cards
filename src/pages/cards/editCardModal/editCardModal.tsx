import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { addCardSchema, AddCardSchema } from '../../../common/formSchemas/formSchemas.ts'
import { Modal, ModalButtonBlock } from '../../../components'
import { ControlledTextField } from '../../../components/ui/controlled/controlledTextField/controlledTextField.tsx'

import s from './editCardModule.module.scss'

type EditCardModalPropsType = {
  open: boolean
  onClose: () => void
  onSubmitCallback: (data: AddCardSchema) => void
}
export const EditCardModal: FC<EditCardModalPropsType> = ({ open, onClose, onSubmitCallback }) => {
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
      <Modal open={open} title={'Edit Pack'} closeModal={onClose}>
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
            errorMessage={errors.answer?.message}
            className={s.textField}
          />
          <ModalButtonBlock
            variant={'second'}
            firstButtonText={'Save Changes'}
            secondButtonText={'Cancel'}
            secondButtonCallback={onClose}
          />
        </form>
      </Modal>
    </>
  )
}
