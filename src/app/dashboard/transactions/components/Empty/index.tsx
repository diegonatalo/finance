import { Clipboard } from '@phosphor-icons/react/dist/ssr/index'

export const Empty = () => (
  <section className="mt-40 flex h-full w-full flex-col items-center gap-2 text-zinc-400">
    <Clipboard size={50} />
    <h1 className="text-xl font-bold">Nenhuma transação encontrada!</h1>
    <p className="text-zinc-500">
      Crie uma transação e comece a controlar seus gastos
    </p>
  </section>
)
