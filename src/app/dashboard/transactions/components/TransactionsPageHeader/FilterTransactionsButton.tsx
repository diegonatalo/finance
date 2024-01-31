import { Funnel } from '@phosphor-icons/react/dist/ssr/index'

export const FilterButton = () => {
  return (
    <button className="flex items-center gap-2 rounded-lg border-2 border-zinc-800 p-4 font-bold text-zinc-100 transition-colors hover:bg-zinc-800/50">
      <Funnel size={20} weight="bold" />
      Filtros
    </button>
  )
}
