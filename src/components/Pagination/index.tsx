'use client'

import { CaretLeft, CaretRight } from '@phosphor-icons/react'

type PaginationProps = {
  activePage: number
  maxPage: number
  nextPage: () => void
  prevPage: () => void
  goPage: (page: number) => void
}

const defaultPaginationClasses =
  'w-11 h-11 flex justify-center items-center font-bold rounded-lg bg-zinc-800 text-zinc-300 disabled:cursor-not-allowed disabled:opacity-60'

export const Pagination = ({
  activePage,
  maxPage,
  nextPage,
  prevPage,
  goPage
}: PaginationProps) => {
  activePage > maxPage && prevPage()

  const pages = []
  const inicio = Math.max(1, activePage - 2)
  const fim = Math.min(maxPage, inicio + 4)
  for (let i = inicio; i <= fim; i++) {
    pages.push(i)
  }

  return (
    <section className="flex w-full justify-center gap-2">
      <button
        className={defaultPaginationClasses}
        onClick={prevPage}
        disabled={activePage === 1}
      >
        <CaretLeft size={20} weight="bold" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${defaultPaginationClasses} ${
            page === activePage ? '!bg-emerald-500/50' : ''
          }`}
          onClick={() => goPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={defaultPaginationClasses}
        onClick={nextPage}
        disabled={activePage === maxPage}
      >
        <CaretRight size={20} weight="bold" />
      </button>
    </section>
  )
}
