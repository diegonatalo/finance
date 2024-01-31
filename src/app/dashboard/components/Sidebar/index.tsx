import {
  ArrowsLeftRight,
  CreditCard,
  Gear,
  House
} from '@phosphor-icons/react/dist/ssr/index'
import { LogoutButton } from './LogoutButton'
import { SidebarItem } from './SidebarItem'

const SidebarItems = [
  { title: 'Início', href: '/dashboard', icon: <House size={24} /> },
  {
    title: 'Transações',
    href: '/dashboard/transactions',
    icon: <ArrowsLeftRight size={24} />
  },
  {
    title: 'Parcelas',
    href: '/dashboard/installments',
    icon: <CreditCard size={24} />
  },
  { title: 'Configurações', href: '/config', icon: <Gear size={24} /> }
]

export const Sidebar = () => {
  return (
    <nav className="flex min-h-screen w-full max-w-[300px] flex-col gap-4 bg-black p-4 text-white">
      {SidebarItems.map((item) => (
        <SidebarItem
          key={item.title}
          title={item.title}
          href={item.href}
          icon={item.icon}
        />
      ))}

      <LogoutButton />
    </nav>
  )
}
