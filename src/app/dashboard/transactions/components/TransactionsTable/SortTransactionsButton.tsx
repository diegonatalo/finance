import { CaretUpDown } from '@phosphor-icons/react/dist/ssr/index'

type SortButtonProps = {
  title: string
  onClick: () => void
}

export const SortButton = ({ title, onClick }: SortButtonProps) => {
  return (
    <button
      className="flex w-full items-center justify-center gap-1 p-4"
      onClick={onClick}
    >
      <CaretUpDown className="-ml-2" size={16} weight="bold" />
      {title}
    </button>
  )
}
