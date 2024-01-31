import { Categories } from '@/@types/TransactionTypes'
import { CaretDown, Check } from '@phosphor-icons/react/dist/ssr/index'
import * as Select from '@radix-ui/react-select'
import { Controller, useFormContext } from 'react-hook-form'

type RadixSelectProps = {
  classes: string
  category?: typeof Categories
}

export const RadixSelect = ({ classes, category }: RadixSelectProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name="category"
      control={control}
      defaultValue={category}
      render={({ field }) => (
        <Select.Root onValueChange={field.onChange} {...field}>
          <Select.Trigger
            className={`flex flex-1 items-center justify-between ${classes}`}
          >
            <Select.Value placeholder="Selecione uma categoria" />
            <Select.Icon>
              <CaretDown size={20} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="overflow-hidden rounded-lg border border-zinc-900 bg-zinc-800 text-zinc-300 shadow-xl shadow-zinc-950">
              <Select.Viewport>
                <Select.Group>
                  {Categories.map((category) => (
                    <Select.Item
                      key={category}
                      className="relative flex cursor-pointer select-none items-center border-y border-zinc-900/50 p-3 pl-9 transition-colors hover:bg-zinc-900/50 data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
                      value={category}
                    >
                      <Select.ItemText>{category}</Select.ItemText>
                      <Select.ItemIndicator className="absolute left-2">
                        <Check className="text-emerald-400" size={20} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      )}
    />
  )
}
