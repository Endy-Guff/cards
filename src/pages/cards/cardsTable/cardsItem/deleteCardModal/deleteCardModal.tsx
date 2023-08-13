import { FC } from 'react'

import { Modal, ModalButtonBlock, Typography } from '../../../../../components'

type DeleteCardModalPropsType = {
  open: boolean
  onClose: () => void
  deleteCard: () => void
}
export const DeleteCardModal: FC<DeleteCardModalPropsType> = ({ open, onClose, deleteCard }) => {
  return (
    <>
      <Modal open={open} title={'Delete Card'} closeModal={onClose}>
        <Typography.Body1>
          Do you really want to remove <Typography.Subtitle1>Card Name?</Typography.Subtitle1>
          All cards will be deleted.
        </Typography.Body1>
        <ModalButtonBlock
          variant={'second'}
          firstButtonText={'Delete Card'}
          secondButtonText={'Cancel'}
          secondButtonCallback={onClose}
          firstButtonCallback={deleteCard}
        />
      </Modal>
    </>
  )
}
