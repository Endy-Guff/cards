import { FC } from 'react'

import { DownIcon } from '../../../assets/icons/components/downIcon.tsx'
import { Select } from '../select'
import { Typography } from '../typography'

import s from './pagination.module.scss'

type PaginationPropsType = {
  pagesCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  itemsPerPage: number
  changeItemsPerPage: (count: number) => void
}

export const Pagination: FC<PaginationPropsType> = ({
  pagesCount,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  changeItemsPerPage,
}) => {
  const listItemsPerPage = [
    { value: '5', label: 5 },
    { value: '10', label: 10 },
    { value: '15', label: 15 },
    { value: '20', label: 20 },
  ]

  const pages: number[] = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const changeItemsPerPageHandler = (count: string) => {
    changeItemsPerPage(+count)
  }

  return (
    <div className={s.pages}>
      <button
        className={s.arrowBtn}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <DownIcon
          size={16}
          color={'var(--color-light-100)'}
          className={s.prevArrow}
          disabled={currentPage === 1}
        />
      </button>
      {currentPage !== pages[0] && currentPage >= 5 && pages.length > 5 && (
        <PageItem
          key={pages[0]}
          className={s.page + ' ' + s.final}
          onClick={setCurrentPage}
          page={pages[0]}
        />
      )}
      {pages.map(p => {
        const pageClass = currentPage === p ? s.page + ' ' + s.active : s.page

        // eslint-disable-next-line no-nested-ternary
        if (pages.length < 5) {
          return <PageItem key={p} className={pageClass} onClick={setCurrentPage} page={p} />
        }

        if (currentPage < 5 || currentPage > pages[pages.length - 5]) {
          if (currentPage <= 5 && p <= 5) {
            return <PageItem key={p} className={pageClass} onClick={setCurrentPage} page={p} />
          } else if (currentPage >= pages[pages.length - 5] && p >= pages[pages.length - 5]) {
            return <PageItem key={p} className={pageClass} onClick={setCurrentPage} page={p} />
          } else return null
        } else if (p < currentPage + 2 && p > currentPage - 2) {
          return <PageItem key={p} className={pageClass} onClick={setCurrentPage} page={p} />
        } else {
          return null
        }
      })}
      {currentPage !== pages[pages.length - 1] &&
        currentPage <= pages[pages.length - 5] &&
        pages.length > 5 && (
          <PageItem
            key={pages[pages.length - 1]}
            className={s.page + ' ' + s.final}
            onClick={setCurrentPage}
            page={pages[pages.length - 1]}
          />
        )}
      <button
        className={s.arrowBtn}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages[pages.length - 1]}
      >
        <DownIcon
          size={16}
          color={'var(--color-light-100)'}
          className={s.nextArrow}
          disabled={currentPage === pages[pages.length - 1]}
        />
      </button>
      <Select
        placeholder={''}
        options={listItemsPerPage}
        width={48}
        height={24}
        value={itemsPerPage.toString()}
        onChange={changeItemsPerPageHandler}
      />
    </div>
  )
}

type PageItemPropsType = {
  className: string
  onClick: (page: number) => void
  page: number
}

const PageItem: FC<PageItemPropsType> = ({ className, onClick, page }) => {
  return (
    <button className={className} onClick={() => onClick(page)}>
      <Typography.Body2>{page}</Typography.Body2>
    </button>
  )
}
