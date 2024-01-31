import { Loader } from '@/components/Loader'
import { useFetcher } from '@/hooks/useFetcher'
import { Line } from 'react-chartjs-2'

export const LineChart = () => {
  const { data, isLoading } = useFetcher(`/api/charts/line?month=${11}`)

  if (isLoading) return <Loader />

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Gasto',
        data: Object.values(data),
        borderColor: '#6366f1',
        backgroundColor: '#6366f130',
        fill: true,
        tension: 0.25
      }
    ]
  }

  return (
    <Line
      data={chartData}
      width={1200}
      height={250}
      options={{ maintainAspectRatio: false }}
    />
  )
}
