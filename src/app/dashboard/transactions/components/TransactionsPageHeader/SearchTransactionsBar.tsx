import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'

export const SearchBar = () => {
  return (
    <div className="flex items-center">
      <span className="z-[0] -mr-8 text-zinc-300">
        <MagnifyingGlass size={20} weight="bold" />
      </span>
      <input className="rounded-lg bg-zinc-800 p-4 pl-11 text-zinc-300" />
    </div>
  )
}
