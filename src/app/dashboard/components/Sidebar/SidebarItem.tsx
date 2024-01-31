'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type SidebarItemProps = {
  title: string
  href: string
  icon: ReactNode
}

export const SidebarItem = ({ title, href, icon }: SidebarItemProps) => {
  const pathname = usePathname()

  return (
    <Link
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-6 py-4 text-lg font-bold ${
        pathname === href ? 'bg-emerald-500/30 text-emerald-400' : 'text-white'
      }`}
      href={href}
    >
      {icon}
      {title}
    </Link>
  )
}
