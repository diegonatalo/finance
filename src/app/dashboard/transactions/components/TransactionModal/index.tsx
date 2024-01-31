import { Transaction } from '@/@types/TransactionTypes'
import * as Dialog from '@radix-ui/react-dialog'
import { TransactionForm } from '../TransactionForm'

type TransactionModalProps = {
  type: 'create' | 'edit'
  transaction?: Transaction
  onOpenChange: (n: boolean) => void
}

export const TransactionModal = ({
  type,
  onOpenChange,
  transaction
}: TransactionModalProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-zinc-800/90" />

      <Dialog.Content className="fixed left-[50%] top-[50%] flex w-full max-w-[700px] -translate-x-[50%] -translate-y-[75%] flex-col gap-4 rounded-lg bg-zinc-900 p-12 shadow-lg">
        <Dialog.Title className="text-lg font-bold">
          {type === 'create' ? 'Cadastrar nova transação' : 'Editar transação'}
        </Dialog.Title>

        <TransactionForm
          transaction={transaction}
          onOpenChange={onOpenChange}
          cancelButton={
            <Dialog.Close asChild>
              <button className="flex-1 rounded-lg border-2 border-red-500 p-4 font-bold uppercase text-red-500 opacity-70 transition-colors hover:border-red-500 hover:bg-red-500/50 hover:text-zinc-100 hover:opacity-100">
                Cancelar
              </button>
            </Dialog.Close>
          }
        />
      </Dialog.Content>
    </Dialog.Portal>
  )
}
