'use client'

import { Loader } from '@/components/Loader'
import { Pagination } from '@/components/Pagination'
import { useFetcher } from '@/hooks/useFetcher'
import { useInstallmentsTableStore } from '@/store/InstallmentsTableStore'
import { Empty } from '../transactions/components/Empty'
import { InstallmentsTable } from './components/InstallmentsTable'

export default function InstallmentsPage() {
  const { activePage, nextPage, prevPage, goPage } = useInstallmentsTableStore()

  const { data, isLoading } = useFetcher(`/api/installments?page=${activePage}`)

  if (isLoading) return <Loader />

  return (
    <main className="flex w-full flex-col gap-8 p-12">
      <h1 className="text-xl font-bold">Parcelas</h1>

      {data && data.installments.length > 0 ? (
        <div className="flex h-full w-full flex-col justify-between">
          <InstallmentsTable installments={data.installments} />

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
    </main>
  )
}
