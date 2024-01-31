'use client'

import { Loader } from '@/components/Loader'
import { useFetcher } from '@/hooks/useFetcher'
import { formatMoney } from '@/utils/format'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  Scales
} from '@phosphor-icons/react/dist/ssr/index'

export const Summary = () => {
  const date = new Date()
  const currentMonth = date.getMonth() + 1

  const { data, isLoading } = useFetcher(
    `/api/transactions/summary?month=${currentMonth}`
  )

  if (isLoading) return <Loader />

  const income = 2500
  const total = income - data

  return (
    <section className="flex w-full flex-wrap gap-8">
      <div className="flex flex-1 flex-col gap-4 rounded-lg bg-zinc-800 p-8 text-emerald-500">
        <header className="flex items-center gap-2 font-bold">
          <ArrowCircleUp size={24} />
          Entradas
        </header>
        <span className="text-center text-4xl">{formatMoney(income)}</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 rounded-lg bg-zinc-800 p-8 text-red-500">
        <header className="flex items-center gap-2 font-bold">
          <ArrowCircleDown size={24} />
          Saidas
        </header>
        <span className="text-center text-4xl">{formatMoney(data)}</span>
      </div>
      <div
        className={`flex flex-1 flex-col gap-4 rounded-lg p-8 ${
          total > 0 ? 'bg-emerald-600' : 'bg-red-600'
        }`}
      >
        <header className="flex items-center gap-2 font-bold">
          <Scales size={24} />
          Total
        </header>
        <span className="text-center text-4xl">{formatMoney(total)}</span>
      </div>
    </section>
  )
}
