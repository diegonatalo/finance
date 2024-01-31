import { FilterButton } from './FilterTransactionsButton'
import { NewTransactionButton } from './NewTransactionButton'
import { SearchBar } from './SearchTransactionsBar'

export const TransactionsPageHeader = () => (
  <header className="flex items-end justify-between">
    <h1 className="text-xl font-bold">Histórico de transações</h1>
    <div className="flex gap-4">
      <SearchBar />
      <FilterButton />
      <NewTransactionButton />
    </div>
  </header>
)
