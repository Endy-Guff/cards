import { FC, useEffect, useState } from 'react'

import useDebounce from '../../../common/hooks/useDebounce.tsx'
import { PagesHeader, TextField, Typography } from '../../../components'
import { decksActions, DecksSliceStateType } from '../../../services/decks/decksSlice.ts'
import { useAppDispatch, useAppSelector } from '../../../services/store.ts'

type DecksToolBarPropsType = {
  headerCallback: () => void
  headerButtonTitle: string
  headerTitle: string
}

export const DecksToolBar: FC<DecksToolBarPropsType> = ({
  headerCallback,
  headerTitle,
  headerButtonTitle,
}) => {
  const { searchByName } = useAppSelector<DecksSliceStateType>(state => state.decksSlice)
  const dispatch = useAppDispatch()
  const { setSearchByName } = decksActions

  const [searchValue, setSearchValue] = useState(searchByName)
  const debounceSearchValue = useDebounce(searchValue, 300)

  useEffect(() => {
    dispatch(setSearchByName({ searchByName: debounceSearchValue }))
  }, [debounceSearchValue])
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  const clearSearchHandler = () => {
    setSearchValue('')
  }

  return (
    <div>
      <PagesHeader buttonCallback={headerCallback} buttonTitle={headerButtonTitle}>
        <Typography.Large>{headerTitle}</Typography.Large>
      </PagesHeader>
      <div>
        <TextField
          search={true}
          onClearClick={clearSearchHandler}
          value={searchValue}
          onChange={onSearchHandler}
        />
      </div>
    </div>
  )
}
