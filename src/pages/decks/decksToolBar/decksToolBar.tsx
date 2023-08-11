import { FC, useEffect, useState } from 'react'

import { DeleteIcon } from '../../../assets/icons/components/deleteIcon.tsx'
import useDebounce from '../../../common/hooks/useDebounce.tsx'
import { Button, Slider, Tabs, TextField } from '../../../components'
import { decksActions, DecksSliceStateType } from '../../../services/decks/decksSlice.ts'
import { useAppDispatch, useAppSelector } from '../../../services/store.ts'

type DecksToolBarPropsType = {}

export const DecksToolBar: FC<DecksToolBarPropsType> = ({}) => {
  const { searchByName, showPacksCardsFilter } = useAppSelector<DecksSliceStateType>(
    state => state.decksSlice
  )
  const dispatch = useAppDispatch()
  const { setSearchByName, setMinMaxCardsCount } = decksActions

  const [selectedTab, setSelectedTab] = useState<string>(showPacksCardsFilter[1].value)
  const [searchValue, setSearchValue] = useState<string>(searchByName)
  const [sliderValue, setSliderValue] = useState<number[]>([0, 20])
  const debounceSearchValue = useDebounce(searchValue, 300)
  const debounceSliderValue = useDebounce(sliderValue, 300)

  useEffect(() => {
    dispatch(setSearchByName({ searchByName: debounceSearchValue }))
    dispatch(setMinMaxCardsCount({ value: sliderValue }))
  }, [debounceSearchValue, debounceSliderValue])
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  const clearSearchHandler = () => {
    setSearchValue('')
  }

  const clearFilter = () => {
    setSearchValue('')
    setSliderValue([0, 20])
    setSelectedTab(showPacksCardsFilter[1].value)
  }

  const changeTabsFilterHandler = (value: string) => {
    // Когда будет auth flow дописать логику. dispatch в authorId своего id
    setSelectedTab(value)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        search={true}
        onClearClick={clearSearchHandler}
        value={searchValue}
        onChange={onSearchHandler}
      />
      <Tabs
        tabs={showPacksCardsFilter}
        label={'Show packs cards'}
        value={selectedTab}
        onValueChange={changeTabsFilterHandler}
      />
      <Slider
        onChange={setSliderValue}
        value={sliderValue}
        min={0}
        max={20}
        label={'Number of cards'}
      />
      <Button
        variant={'secondary'}
        onClick={clearFilter}
        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <DeleteIcon size={16} color={'var(--color-light-100)'} />
        Clear Filter
      </Button>
    </div>
  )
}
