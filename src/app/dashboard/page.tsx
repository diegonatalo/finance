import { Charts } from './components/Charts'
import { Header } from './components/Header'
import { Summary } from './components/Summary'

export default async function Dashboard() {
  return (
    <main className="flex w-full flex-col gap-8 overflow-y-auto p-12">
      <Header />
      <Summary />
      <Charts />
    </main>
  )
}
