import { Plus } from '@phosphor-icons/react/dist/ssr/index'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { TransactionModal } from '../TransactionModal'

export const NewTransactionButton = () => {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <Dialog.Root open={modal} onOpenChange={setModal}>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-2 rounded-lg bg-emerald-700 p-4 font-bold text-zinc-100 transition-colors hover:bg-emerald-700/70">
          <Plus size={20} weight="bold" />
          Nova Transação
        </button>
      </Dialog.Trigger>

      <TransactionModal type="create" onOpenChange={setModal} />
    </Dialog.Root>
  )
}
