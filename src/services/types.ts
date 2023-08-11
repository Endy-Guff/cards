export type PaginationEntity<T> = {
  pagination: Pagination
  items: T[]
}

export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
