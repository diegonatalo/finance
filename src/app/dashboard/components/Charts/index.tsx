'use client'

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'

ChartJS.register(
  Filler,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

export const Charts = () => {
  return (
    <section className="flex w-full justify-evenly gap-4 px-4">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-zinc-300">Gasto por setor:</h2>
        <div>
          <PieChart />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-zinc-300">Gasto por dia</h2>
        <div>
          <LineChart />
        </div>
      </div>
    </section>
  )
}
