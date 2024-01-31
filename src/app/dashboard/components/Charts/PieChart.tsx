import { Loader } from '@/components/Loader'
import { useFetcher } from '@/hooks/useFetcher'
import { Pie } from 'react-chartjs-2'

const date = new Date()
const currentMonth = date.getMonth() + 1

export const PieChart = () => {
  const { data, isLoading } = useFetcher(
    `/api/charts/pie?month=${currentMonth}`
  )

  if (isLoading) return <Loader />

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Gasto total',
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(255, 159, 64, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(75, 192, 192, 0.3)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <Pie
      data={chartData}
      width={250}
      height={250}
      options={{ maintainAspectRatio: false, layout: { padding: 1 } }}
    />
  )
}
