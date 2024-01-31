import { Installment } from '@/@types/TransactionTypes'
import { formatDate, formatMoney } from '@/utils/format'

type InstallmentsTableProps = {
  installments: Installment[]
}

const defaultTableClasses = 'border-t-2 border-zinc-900 p-4'

export const InstallmentsTable = ({ installments }: InstallmentsTableProps) => {
  return (
    <table className="border-collapse">
      <thead className="bg-zinc-950/50 text-zinc-200">
        <tr>
          <th className="w-[40%] rounded-tl-lg p-4">Título</th>
          <th className="border-l border-l-zinc-800 p-4">Valor</th>
          <th className="border-l border-l-zinc-800 p-4">Data</th>
          <th className="rounded-tr-lg border-l border-l-zinc-800 p-4">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="text-zinc-300">
        {installments.map((installment: Installment) => (
          <tr
            key={installment.id}
            className="odd:bg-zinc-800 even:bg-zinc-800/50"
          >
            <td className={`${defaultTableClasses}`}>{installment.title}</td>
            <td className={`border-l text-center ${defaultTableClasses}`}>
              {formatMoney(installment.value)}
            </td>
            <td className={`border-l text-center ${defaultTableClasses}`}>
              {formatDate(installment.date)}
            </td>
            <td className={`border-l text-center ${defaultTableClasses}`}>
              {new Date(installment.date) > new Date() ? (
                <span className="rounded-lg bg-amber-500/30 px-4 py-2 text-amber-400">
                  Pendente
                </span>
              ) : (
                <span className="rounded-lg bg-emerald-500/30 px-4 py-2 text-emerald-400">
                  Paga
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
