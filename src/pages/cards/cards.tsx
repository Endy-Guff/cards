import { NavLink, useParams } from 'react-router-dom'

import { ArrowPointer } from '../../assets/icons/components/arrowPointer.tsx'
import { Button, Header, Page, PagesHeader, Pagination, Typography } from '../../components'
import { useGetCardsQuery } from '../../services/cards/cardsApi.ts'
import { cardsActions, CardsSliceStateType } from '../../services/cards/cardsSlice.ts'
import { useGetDeckByIdQuery } from '../../services/decks'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

import s from './cards.module.scss'
import { CardsTable } from './cardsTable/cardsTable.tsx'
export const Cards = () => {
  const params = useParams<{ deckId: string }>()
  const { itemsPerPage, currentPage } = useAppSelector<CardsSliceStateType>(
    state => state.cardsSlice
  )

  const dispatch = useAppDispatch()
  const { setItemsPerPage, setCurrentPage } = cardsActions
  const { data, isLoading } = useGetCardsQuery({ id: params.deckId!, currentPage, itemsPerPage })
  const { data: deckData, isLoading: isLoadingDeck } = useGetDeckByIdQuery({ id: params.deckId! })

  const setCurrentPageHandler = (count: number) => {
    dispatch(setCurrentPage({ currentPage: count }))
  }

  const setItemsPerPageHandler = (count: number) => {
    dispatch(setItemsPerPage({ itemsPerPage: count }))
  }

  if (isLoading || isLoadingDeck) return <div>Loading...</div>

  return (
    <>
      <Header isLoggedIn={false} />
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
            buttonCallback={() => {}} // дописать
            buttonTitle={'Add New Card'}
            showButton={!!data?.items.length}
          >
            <Typography.Large>{deckData?.name}</Typography.Large>
          </PagesHeader>
          {data?.items.length ? (
            <CardsTable data={data} />
          ) : (
            <div className={s.emptyDataBlock}>
              <Typography.Body1>
                This pack is empty. Click add new card to fill this pack
              </Typography.Body1>
              <Button variant={'primary'} onClick={() => {}}>
                {/*дописать*/}
                Add New Card
              </Button>
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
