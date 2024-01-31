import {
  CardFlags,
  Categories,
  PaymentMethods
} from '@/@types/TransactionTypes'
import * as z from 'zod'

export const newTransactionFormSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(150).optional(),
  category: z.enum(Categories, {
    required_error: 'Por favor, selecione uma categoria'
  }),
  value: z.number().min(1),
  paymentMethod: z.enum(PaymentMethods),
  cardFlag: z.enum(CardFlags),
  installmentsQuantity: z.number().optional(),
  date: z.date(),
  cardIsClosed: z.boolean().optional()
})

export type NewTransactionFormData = z.infer<typeof newTransactionFormSchema>
