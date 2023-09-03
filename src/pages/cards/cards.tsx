import { useState } from 'react'

import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { ArrowPointer } from '../../assets/icons/components/arrowPointer.tsx'
import { AddCardSchema, AddPackSchema } from '../../common/formSchemas/formSchemas.ts'
import { Button, Header, Page, PagesHeader, Pagination, Typography } from '../../components'
import { useGetMeQuery } from '../../services/auth'
import { useCreateCardMutation, useGetCardsQuery } from '../../services/cards/cardsApi.ts'
import { cardsActions, CardsSliceStateType } from '../../services/cards/cardsSlice.ts'
import {
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useUpdateDeckMutation,
} from '../../services/decks'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'
import { DeleteDecksModal } from '../decks/deleteDecksModal/deleteDecksModal.tsx'
import { EditDecksModal } from '../decks/editDecksModal/editDecksModal.tsx'

import { AddCardModal } from './addCardModal/addCardModal.tsx'
import s from './cards.module.scss'
import { CardsTable } from './cardsTable/cardsTable.tsx'
import { LearnDeckModal } from './learnDeckModal/learnDeckModal.tsx'
export const Cards = () => {
  const params = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const { itemsPerPage, currentPage } = useAppSelector<CardsSliceStateType>(
    state => state.cardsSlice
  )
  const dispatch = useAppDispatch()

  const [addCardModalIsOpen, setAddCardModalIsOpen] = useState<boolean>(false)
  const [deleteDeckModalIsOpen, setDeleteDeckModalIsOpen] = useState<boolean>(false)
  const [editDeckModalIsOpen, setEditDeckModalIsOpen] = useState<boolean>(false)
  const [learnDeckModalIsOpen, setLearnDeckModalIsOpen] = useState<boolean>(false)

  const { setItemsPerPage, setCurrentPage } = cardsActions

  const { data, isLoading } = useGetCardsQuery({ id: params.deckId!, currentPage, itemsPerPage })
  const { data: deckData, isLoading: isLoadingDeck } = useGetDeckByIdQuery({ id: params.deckId! })
  const { data: meData } = useGetMeQuery()
  const [createCard] = useCreateCardMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [editDeck] = useUpdateDeckMutation()

  const setCurrentPageHandler = (count: number) => {
    dispatch(setCurrentPage({ currentPage: count }))
  }

  const setItemsPerPageHandler = (count: number) => {
    dispatch(setItemsPerPage({ itemsPerPage: count }))
  }

  const createCardFormSubmit = (data: AddCardSchema) => {
    createCard({ id: params.deckId!, question: data.question, answer: data.answer })
  }

  const showDeleteDeckModal = () => {
    setDeleteDeckModalIsOpen(true)
  }
  const showEditDeckModal = () => {
    setEditDeckModalIsOpen(true)
  }

  const deleteDeckHandler = () => {
    deleteDeck({ id: deckData!.id })
    navigate('/')
  }

  const learnDeckHandler = () => {
    setLearnDeckModalIsOpen(true)
  }

  const editDeckHandler = (data: AddPackSchema) => {
    editDeck({ name: data.namePack, id: deckData!.id, isPrivate: data.private })
  }

  if (isLoading || isLoadingDeck) return <div>Loading...</div>

  return (
    <>
      <Header isLoggedIn={false} />
      <AddCardModal
        size={'lg'}
        open={addCardModalIsOpen}
        onClose={() => setAddCardModalIsOpen(false)}
        onSubmitCallback={createCardFormSubmit}
      />
      <DeleteDecksModal
        open={deleteDeckModalIsOpen}
        onClose={() => setDeleteDeckModalIsOpen(false)}
        deleteDeck={deleteDeckHandler}
      />
      <EditDecksModal
        open={editDeckModalIsOpen}
        onClose={() => setEditDeckModalIsOpen(false)}
        onSubmitCallback={editDeckHandler}
      />
      <LearnDeckModal
        open={learnDeckModalIsOpen}
        packId={params.deckId!}
        packName={deckData!.name}
        onClose={() => setLearnDeckModalIsOpen(false)}
      />
      <Page>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          <NavLink
            to={'/'}
            style={{ display: 'flex', gap: '6px', alignItems: 'center', textDecoration: 'none' }}
          >
            <ArrowPointer />
            <Typography.Body2>Back to Packs List</Typography.Body2>
          </NavLink>
          <PagesHeader
            buttonCallback={() => setAddCardModalIsOpen(true)}
            buttonTitle={'Add New Card'}
            showButton={!!data?.items.length && deckData?.userId === meData?.id}
            showDropDown={true}
            deleteCallback={showDeleteDeckModal}
            editCallback={showEditDeckModal}
            learnCallback={learnDeckHandler}
          >
            <Typography.Large>{deckData?.name}</Typography.Large>
          </PagesHeader>
          {data?.items.length ? (
            <CardsTable data={data} />
          ) : (
            <div className={s.emptyDataBlock}>
              <Typography.Body1>
                {deckData?.userId === meData?.id
                  ? 'This pack is empty. Click add new card to fill this pack'
                  : 'This pack is empty.'}
              </Typography.Body1>
              {deckData?.userId === meData?.id && (
                <Button variant={'primary'} onClick={() => setAddCardModalIsOpen(true)}>
                  Add New Card
                </Button>
              )}
            </div>
          )}
          {data!.pagination.totalPages > 0 && (
            <Pagination
              pagesCount={data!.pagination.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPageHandler}
              itemsPerPage={itemsPerPage}
              changeItemsPerPage={setItemsPerPageHandler}
            />
          )}
        </div>
      </Page>
    </>
  )
}
