'use client'

import { api } from '@/lib/axios'
import { Trash } from '@phosphor-icons/react'
import toast from 'react-hot-toast'

async function handleDeleteTransaction(id: string) {
  await api.delete(`/api/transactions/${id}`)
}

export const DeleteButton = ({ id }: { id: string }) => {
  return (
    <button
      className="transition-colors hover:text-red-500"
      onClick={() =>
        toast.promise(handleDeleteTransaction(id), {
          loading: 'Processando...',
          success: <b>Excluído com sucesso!</b>,
          error: <b>Falha ao excluir.</b>
        })
      }
    >
      <Trash size={24} />
    </button>
  )
}
