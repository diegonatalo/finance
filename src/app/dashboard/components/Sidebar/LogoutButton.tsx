'use client'

import { useClerk } from '@clerk/clerk-react'
import { SignOut } from '@phosphor-icons/react'

export const LogoutButton = () => {
  const { signOut } = useClerk()

  return (
    <button
      className="mt-auto flex cursor-pointer items-center gap-3 rounded-lg px-6 py-4 text-lg font-bold text-white transition-colors hover:text-red-500"
      onClick={() => signOut()}
    >
      <SignOut size={24} />
      Sair
    </button>
  )
}
