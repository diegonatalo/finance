'use client'

import { Transaction } from '@/@types/TransactionTypes'
import {
  NewTransactionFormData,
  newTransactionFormSchema
} from '@/lib/TransactionsSchema'
import { api } from '@/lib/axios'
import { formatDateInput } from '@/utils/format'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard } from '@phosphor-icons/react'
import { ReactNode, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RadixSelect } from './Select'
import { RadixToggleGroup } from './Toogle'

const formDefaultClasses =
  'border-2 border-zinc-700/50 bg-zinc-800 text-zinc-300 p-4 rounded-lg opacity-80 transition-colors hover:opacity-100 focus:opacity-100'

type TransactionFormProps = {
  cancelButton: ReactNode
  transaction?: Transaction
  onOpenChange: (n: boolean) => void
}

export const TransactionForm = ({
  transaction,
  cancelButton,
  onOpenChange
}: TransactionFormProps) => {
  const { user } = useUser()

  const methods = useForm<NewTransactionFormData>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  const onSubmit = async (data: NewTransactionFormData) => {
    const {
      title,
      description,
      category,
      value,
      paymentMethod,
      cardFlag,
      installmentsQuantity,
      date,
      cardIsClosed
    } = data

    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)

    const newTransaction = {
      title,
      description,
      category,
      value,
      paymentMethod,
      cardFlag,
      installmentsQuantity: installmentsQuantity || null,
      date: newDate,
      cardIsClosed: cardIsClosed || null,
      userId: user?.id
    }

    !transaction
      ? toast
          .promise(api.post('/api/transactions', newTransaction), {
            loading: <b>Processando...</b>,
            success: <b>Transação criada!</b>,
            error: <b>Falha ao criar.</b>
          })
          .then(() => onOpenChange(false))
      : toast
          .promise(
            api.patch(`/api/transactions/${transaction.id}`, newTransaction),
            {
              loading: <b>Processando...</b>,
              success: <b>Transação atualizada!</b>,
              error: <b>Falha ao atualizar.</b>
            }
          )
          .then(() => onOpenChange(false))
  }

  const payment = methods.watch('paymentMethod')
    ? methods.watch('paymentMethod')
    : transaction?.paymentMethod

  useEffect(() => {
    if (payment === 'Crédito') {
      methods.register('installmentsQuantity')
      methods.register('cardIsClosed')
    } else {
      methods.unregister('installmentsQuantity')
      methods.unregister('cardIsClosed')
    }
  }, [payment, methods])

  return (
    <FormProvider {...methods}>
      <form
        id="new-transaction-form"
        className="flex flex-wrap gap-3"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <input
          className={`w-full ${formDefaultClasses}`}
          placeholder="Título"
          required
          min={3}
          max={100}
          {...methods.register('title')}
          defaultValue={transaction?.title}
        />
        <textarea
          className={`w-full resize-none ${formDefaultClasses}`}
          placeholder="Descrição (opcional)"
          minLength={3}
          maxLength={150}
          {...methods.register('description')}
          defaultValue={transaction?.description}
        />

        <RadixSelect
          classes={formDefaultClasses}
          category={transaction?.category}
        />

        <input
          className={`flex-1 ${formDefaultClasses}`}
          type="number"
          placeholder="Valor"
          required
          min={1}
          {...methods.register('value', { valueAsNumber: true })}
          defaultValue={transaction?.value}
        />

        {methods.formState.errors.category && (
          <p className="w-full text-sm text-red-500">
            {methods.formState.errors.category.message}
          </p>
        )}

        <div className="flex w-full gap-4">
          <RadixToggleGroup
            classes={formDefaultClasses}
            name="paymentMethod"
            defaultValue={transaction?.paymentMethod}
            values={['Débito', 'Crédito']}
            icon={<CreditCard size={24} />}
          />

          <RadixToggleGroup
            classes={formDefaultClasses}
            name="cardFlag"
            defaultValue={transaction?.cardFlag}
            values={['Master', 'Visa']}
          />
        </div>

        {payment === 'Crédito' ? (
          <input
            className={`flex-1 ${formDefaultClasses}`}
            type="number"
            defaultValue={
              transaction?.installmentsQuantity &&
              transaction.installmentsQuantity
            }
            placeholder="Quantidade de parcelas"
            required
            min={1}
            {...methods.register('installmentsQuantity', {
              valueAsNumber: true
            })}
          />
        ) : null}

        <input
          className={`flex-1 ${formDefaultClasses}`}
          type="date"
          defaultValue={
            transaction?.date
              ? formatDateInput(transaction.date)
              : formatDateInput(new Date())
          }
          required
          max={formatDateInput(new Date())}
          {...methods.register('date', { valueAsDate: true })}
        />

        {payment === 'Crédito' ? (
          <div className="flex w-full justify-start gap-2 p-2">
            <input
              className={`w-5 ${formDefaultClasses}`}
              type="checkbox"
              defaultChecked={transaction?.cardIsClosed}
              {...methods.register('cardIsClosed')}
            />
            <label className="text-md text-gray-500">
              Marque caso o cartão já esteja fechado.
            </label>
          </div>
        ) : null}

        <div className="flex w-full gap-4">
          {cancelButton}

          <button
            className="flex-1 rounded-lg bg-emerald-500/60 p-4 font-bold uppercase transition-colors hover:bg-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={methods.formState.isSubmitting}
          >
            {transaction ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
