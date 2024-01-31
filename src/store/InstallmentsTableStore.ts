import { create } from 'zustand'

type InstallmentsTableStore = {
  activePage: number
  nextPage: () => void
  prevPage: () => void
  goPage: (n: number) => void
}

export const useInstallmentsTableStore = create<InstallmentsTableStore>()(
  (set) => ({
    activePage: 1,
    nextPage: () => set((state) => ({ activePage: state.activePage + 1 })),
    prevPage: () => set((state) => ({ activePage: state.activePage - 1 })),
    goPage: (n: number) => set({ activePage: n })
  })
)
