'use client'

import { getMonth } from '@/utils/format'
import { UserButton, useUser } from '@clerk/nextjs'

export const Header = () => {
  const { user } = useUser()

  return (
    <header className="flex w-full items-center justify-between px-4">
      <div className="flex flex-col">
        <h1 className="text-2xl">Seja bem-vindo {user?.fullName}!</h1>
        <span className="text-zinc-400">
          {'Esse é o seu resumo de ' + getMonth(new Date())}
        </span>
      </div>
      <UserButton afterSignOutUrl="/" />
    </header>
  )
}
