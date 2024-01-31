export const Categories = [
  'Água',
  'Alimentação',
  'Aluguel',
  'Casa',
  'Energia',
  'Ensino',
  'Gás',
  'Lazer',
  'Mercado',
  'Saúde',
  'Serviços',
  'Transporte',
  'Vestuário',
  'Outro'
] as const

export const PaymentMethods = ['Débito', 'Crédito'] as const
export const CardFlags = ['Master', 'Visa'] as const

export type Installment = {
  id?: string
  title: string
  date: Date
  value: number
  transactionId?: string
}

export type Transaction = {
  id?: string
  userId: string
  title: string
  description?: string
  category: typeof Categories
  value: number
  paymentMethod: typeof PaymentMethods
  cardFlag: typeof CardFlags
  date: Date
  installmentsQuantity?: number
  cardIsClosed?: boolean
  installments?: Installment[]
}
