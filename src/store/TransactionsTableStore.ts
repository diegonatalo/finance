import { create } from 'zustand'

type TransactionsTableStore = {
  activePage: number
  nextPage: () => void
  prevPage: () => void
  goPage: (n: number) => void
  sortValueOrder: string
  sortDateOrder: string
  toggleSortValueOrder: () => void
  toggleSortDateOrder: () => void
}

export const useTransactionsTableStore = create<TransactionsTableStore>()(
  (set) => ({
    activePage: 1,
    nextPage: () => set((state) => ({ activePage: state.activePage + 1 })),
    prevPage: () => set((state) => ({ activePage: state.activePage - 1 })),
    goPage: (n: number) => set({ activePage: n }),
    sortValueOrder: 'desc',
    sortDateOrder: 'desc',
    toggleSortValueOrder: () =>
      set((state) => ({
        sortValueOrder: state.sortValueOrder === 'desc' ? 'asc' : 'desc'
      })),
    toggleSortDateOrder: () =>
      set((state) => ({
        sortDateOrder: state.sortDateOrder === 'desc' ? 'asc' : 'desc'
      }))
  })
)
