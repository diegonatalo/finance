import { Transaction } from '@/@types/TransactionTypes'
import { useTransactionsTableStore } from '@/store/TransactionsTableStore'
import { SortButton } from './SortTransactionsButton'
import { TransactionItem } from './TransactionItem'

type TransactionsTableProps = {
  transactions: Transaction[]
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const { toggleSortValueOrder, toggleSortDateOrder } =
    useTransactionsTableStore()

  return (
    <table className="w-full border-collapse">
      <thead className="bg-zinc-950/50 text-zinc-200">
        <tr>
          <th className="w-[40%] rounded-tl-lg p-4">Título</th>
          <th className="border-l border-l-zinc-800">
            <SortButton title="Valor" onClick={toggleSortValueOrder} />
          </th>
          <th className="border-l border-l-zinc-800 p-4">Categoria</th>
          <th className="border-l border-l-zinc-800 p-4">Forma de pagamento</th>
          <th className="border-l border-l-zinc-800 p-4">Bandeira</th>
          <th className="border-l border-l-zinc-800">
            <SortButton title="Data" onClick={toggleSortDateOrder} />
          </th>
          <th className="rounded-tr-lg border-l border-l-zinc-800 p-4">
            Ações
          </th>
        </tr>
      </thead>
      <tbody className="text-zinc-300">
        {transactions.map((transaction: Transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  )
}
