import { FC } from 'react'

import { Modal, ModalButtonBlock, Typography } from '../../../components'

type DeleteDecksModalPropsType = {
  open: boolean
  onClose: () => void
  deleteDeck: () => void
}
export const DeleteDecksModal: FC<DeleteDecksModalPropsType> = ({ open, onClose, deleteDeck }) => {
  return (
    <>
      <Modal open={open} title={'Edit Pack'} closeModal={onClose}>
        <Typography.Body1>
          Do you really want to remove <Typography.Subtitle1>Pack Name?</Typography.Subtitle1> All
          cards will be deleted.
        </Typography.Body1>
        <ModalButtonBlock
          variant={'second'}
          firstButtonText={'Delete Pack'}
          secondButtonText={'Cancel'}
          secondButtonCallback={onClose}
          firstButtonCallback={deleteDeck}
        />
      </Modal>
    </>
  )
}
