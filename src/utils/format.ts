import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export const getMonth = (date: Date) => {
  return dayjs(date).format('MMMM YYYY')
}

export const formatDate = (date: Date) => {
  return dayjs(date).format('DD[/]MM[/]YYYY')
}

export const formatDateInput = (date: Date) => {
  return dayjs(date).format('YYYY[-]MM[-]DD')
}

export const formatMoney = (amount: number) => {
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export const getTotalDaysInMonth = (date: Date) => {
  return dayjs(date).daysInMonth()
}
