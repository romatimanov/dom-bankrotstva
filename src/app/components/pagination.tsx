import { clsx } from 'clsx'

type PaginationProps = {
  currentPage: number
  setCurrentPage: (page: any) => void
  totalPages: number
  style: any
}

export const renderPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  style
}: PaginationProps) => {
  const maxPageButtons = 3
  const startPage = Math.min(
    Math.max(currentPage - Math.floor(maxPageButtons / 2), 1),
    Math.max(totalPages - maxPageButtons + 1, 1)
  )

  const pageNumbers = []
  for (let i = startPage; i < startPage + maxPageButtons && i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={style.pagination}>
      <button
        onClick={() => setCurrentPage((p: number) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className={`${style.pagBtn} ${style.prevnext}`}
      >
        Пред.
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={clsx(style.pagBtn, {
            [style.activePage]: currentPage === page
          })}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          <button className={`${style.dots} ${style.pagBtn}`} disabled>
            ...
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={clsx(style.pagBtn, {
              [style.activePage]: currentPage === totalPages
            })}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => setCurrentPage((p: number) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`${style.pagBtn} ${style.prevnext}`}
      >
        След.
      </button>
    </div>
  )
}
