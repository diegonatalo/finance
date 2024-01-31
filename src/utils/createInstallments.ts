import { Installment, Transaction } from '@/@types/TransactionTypes'

const generateInstallmentsDates = (
  transactionDate: Date,
  installmentsQuantity: number,
  cardIsClosed: boolean
): Date[] => {
  const installmentsDates: Date[] = []

  for (let i = 1; i <= installmentsQuantity; i++) {
    const newDate = new Date(transactionDate)
    newDate.setMonth(transactionDate.getMonth() + (cardIsClosed ? i : i - 1))
    installmentsDates.push(newDate)
  }

  return installmentsDates
}

type createInstallmentsProps = Transaction & {
  installmentsQuantity: number
  cardIsClosed: boolean
}

export const createInstallments = (transaction: createInstallmentsProps) => {
  const installmentValue = transaction.value / transaction.installmentsQuantity

  const installmentsDates = generateInstallmentsDates(
    new Date(transaction.date),
    transaction.installmentsQuantity,
    transaction.cardIsClosed
  )

  const installments: Installment[] = Array.from(
    { length: transaction.installmentsQuantity },
    (_, index) => {
      return {
        title: `${transaction.title} (${index + 1}/${
          transaction.installmentsQuantity
        })`,
        date: installmentsDates[index],
        value: installmentValue
      }
    }
  )

  return installments
}
