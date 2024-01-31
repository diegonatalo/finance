'use client'

import { Transaction } from '@/@types/TransactionTypes'
import { Loader } from '@/components/Loader'
import { Pagination } from '@/components/Pagination'
import { Toaster } from '@/components/Toaster'
import { useFetcher } from '@/hooks/useFetcher'
import { useTransactionsTableStore } from '@/store/TransactionsTableStore'
import { Empty } from './components/Empty'
import { TransactionsPageHeader } from './components/TransactionsPageHeader'
import { TransactionsTable } from './components/TransactionsTable'

type FetcherType = {
  transactions: Transaction[]
  maxPage: number
}

export default function TransactionsPage() {
  const {
    activePage,
    nextPage,
    prevPage,
    goPage,
    sortValueOrder,
    sortDateOrder
  } = useTransactionsTableStore()

  const { data, isLoading } = useFetcher<FetcherType>(
    `/api/transactions?page=${activePage}&sortValueOrder=${sortValueOrder}&sortDateOrder=${sortDateOrder}`
  )

  if (isLoading) return <Loader />

  return (
    <main className="flex w-full flex-col gap-8 p-12">
      <TransactionsPageHeader />

      {data && data.transactions.length > 0 ? (
        <div className="flex h-full w-full flex-col justify-between">
          <TransactionsTable transactions={data.transactions} />

          <Pagination
            activePage={activePage}
            maxPage={data.maxPage}
            nextPage={nextPage}
            prevPage={prevPage}
            goPage={goPage}
          />
        </div>
      ) : (
        <Empty />
      )}

      <Toaster />
    </main>
  )
}
