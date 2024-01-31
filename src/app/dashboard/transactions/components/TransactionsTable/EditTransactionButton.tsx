import { Transaction } from '@/@types/TransactionTypes'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/index'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { TransactionModal } from '../TransactionModal'

type EditButtonProps = {
  transaction: Transaction
}

export const EditButton = ({ transaction }: EditButtonProps) => {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <Dialog.Root open={modal} onOpenChange={setModal}>
      <Dialog.Trigger asChild>
        <button className="transition-colors hover:text-yellow-500">
          <PencilSimple size={24} />
        </button>
      </Dialog.Trigger>

      <TransactionModal
        type="edit"
        transaction={transaction}
        onOpenChange={setModal}
      />
    </Dialog.Root>
  )
}
