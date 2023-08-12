import { ReactNode, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'

import { Modal, ModalButtonBlock, Size } from './modal.tsx'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
      <div style={{ height: '50vh' }}>
        <Button variant={'primary'} onClick={() => setIsOpen(true)}>
          Show modal
        </Button>
        <Modal {...args} open={isOpen} closeModal={() => setIsOpen(false)}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Modal>
      </div>
    )
  },
  args: {
    title: 'Modal',
  } as {
    size?: Size | undefined
    showHeader?: boolean | undefined
    showCloseButton?: boolean | undefined
    open: boolean
    title: string
    children: ReactNode
    closeModal?: (() => void) | undefined
  },
}

export const WithButtons: Story = {
  render: args => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
      <>
        <Button variant={'primary'} onClick={() => setIsOpen(true)}>
          Show modal
        </Button>
        <Modal {...args} open={isOpen} closeModal={() => setIsOpen(false)} />
      </>
    )
  },
  args: {
    size: 'lg',
    open: false,
    title: 'Modal With Buttons',
    children: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <ModalButtonBlock
          variant={'second'}
          firstButtonText={'button'}
          secondButtonText={'button'}
          firstButtonCallback={() => {}}
        />
      </div>
    ),
  },
}
