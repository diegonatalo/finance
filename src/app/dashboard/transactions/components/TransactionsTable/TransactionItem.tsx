import { Transaction } from '@/@types/TransactionTypes'
import { formatDate, formatMoney } from '@/utils/format'
import { DeleteButton } from './DeleteTransactionButton'
import { EditButton } from './EditTransactionButton'

type TransactionItemProps = {
  transaction: Transaction
}

const defaultTdClasses = 'border-t-2 border-zinc-900 p-4'

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <tr className="odd:bg-zinc-800 even:bg-zinc-800/50">
      <td className={`w-[40%] ${defaultTdClasses}`}>{transaction.title}</td>

      <td className={`border-l text-center ${defaultTdClasses}`}>
        {formatMoney(transaction.value)}
      </td>

      <td className={`border-l text-center ${defaultTdClasses}`}>
        {transaction.category}
      </td>

      <td className={`border-l text-center ${defaultTdClasses}`}>
        {transaction.paymentMethod}
      </td>

      <td className={`border-l text-center ${defaultTdClasses}`}>
        {transaction.cardFlag}
      </td>

      <td className={`border-l text-center ${defaultTdClasses}`}>
        {formatDate(transaction.date)}
      </td>

      <td className={`border-l text-center ${defaultTdClasses}`}>
        <div className="flex justify-center gap-4">
          <EditButton transaction={transaction} />
          <DeleteButton id={transaction.id} />
        </div>
      </td>
    </tr>
  )
}
