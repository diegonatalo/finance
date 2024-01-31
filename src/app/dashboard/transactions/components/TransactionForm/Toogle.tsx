import { CardFlags, PaymentMethods } from '@/@types/TransactionTypes'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const toggleGroupItemClasses =
  'data-[state=on]:opacity-100 data-[state=on]:border-emerald-500/40 flex-1 data-[state=on]:bg-emerald-500/20 data-[state=on]:text-emerald-400 flex items-center justify-center gap-2'

type RadixToggleGroupProps = {
  classes: string
  name: string
  defaultValue?: typeof PaymentMethods | typeof CardFlags
  values: string[]
  icon?: ReactNode
}

export const RadixToggleGroup = ({
  classes,
  name,
  defaultValue,
  values,
  icon
}: RadixToggleGroupProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ToggleGroup.Root
          className="flex flex-1 gap-3"
          type="single"
          aria-label="Forma de pagamento"
          onValueChange={field.onChange}
          {...field}
        >
          {values.map((value) => (
            <ToggleGroup.Item
              key={value}
              className={toggleGroupItemClasses + ' ' + classes}
              value={value}
              aria-label={value}
            >
              {icon}
              {value}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      )}
    />
  )
}
