import { FC, useState } from 'react'

import { Button, Modal, Option, RadioGroup, Size, Typography } from '../../../components'
import { useLearnDeckQuery, useLearnGradeMutation } from '../../../services/decks'

const gradeOptions: Option[] = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Сonfused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]

type LearnDeckModalPropsType = {
  open: boolean
  size?: Size
  packId: string
  packName: string
  onClose: () => void
}

export const LearnDeckModal: FC<LearnDeckModalPropsType> = ({
  open,
  onClose,
  size,
  packId,
  packName,
}) => {
  const [responseCount, setResponseCount] = useState(0)
  const [isAnswerShow, setIsAnswerShow] = useState(false)
  const [grade, setGrade] = useState('3')
  const { data, isLoading, refetch, isFetching } = useLearnDeckQuery({ id: packId })
  const [setGradeMutation] = useLearnGradeMutation()
  const onCloseHandler = () => {
    onClose()
    setResponseCount(0)
    setIsAnswerShow(false)
  }

  const nextQuestionHandler = () => {
    if (responseCount <= 9) {
      setResponseCount(state => state + 1)
      setIsAnswerShow(false)
      setGradeMutation({ id: packId, cardId: data!.id, grade: +grade })
      refetch()
    } else onCloseHandler()
  }

  return (
    <>
      <Modal
        open={open}
        size={size}
        showCloseButton={false}
        showHeader={false}
        closeModal={onCloseHandler}
      >
        <Typography.Large mb={45} style={{ textAlign: 'center', display: 'block' }}>
          Learn &quot;{packName}&quot;
        </Typography.Large>
        {isLoading || isFetching ? (
          <div>Loading...</div>
        ) : (
          <>
            <Typography.Subtitle1 mb={15} style={{ display: 'block' }}>
              Question:
            </Typography.Subtitle1>
            <Typography.Body1 mb={15} style={{ display: 'block' }}>
              {data?.question}
            </Typography.Body1>
            <Typography.Body2 mb={15} color={'var(--color-dark-100)'} style={{ display: 'block' }}>
              Количество попыток ответов на вопрос: {10 - responseCount}
            </Typography.Body2>
            {!isAnswerShow && (
              <Button variant={'primary'} fullWidth={true} onClick={() => setIsAnswerShow(true)}>
                <Typography.Subtitle2>Show Answer</Typography.Subtitle2>
              </Button>
            )}
            {isAnswerShow && (
              <>
                <Typography.Subtitle1 mb={15} style={{ display: 'block' }}>
                  Answer:
                </Typography.Subtitle1>
                <Typography.Body1 mb={15} style={{ display: 'block' }}>
                  {data?.answer}
                </Typography.Body1>
                <Typography.Subtitle1 mb={15} style={{ display: 'block' }}>
                  Rate yourself:
                </Typography.Subtitle1>
                <RadioGroup options={gradeOptions} value={grade} onChange={setGrade} />
                <Button variant={'primary'} fullWidth={true} onClick={nextQuestionHandler}>
                  <Typography.Subtitle2>Next Question</Typography.Subtitle2>
                </Button>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  )
}
