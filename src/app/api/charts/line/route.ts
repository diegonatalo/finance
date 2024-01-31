import { prisma } from '@/lib/prisma'
import { getTotalDaysInMonth } from '@/utils/format'
import { GenerateDates } from '@/utils/generateDates'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const user = await currentUser()

  const { month, year } = GenerateDates(request)

  const startDate = new Date(`${year}-${month}-01`)
  const endDate = new Date(`${year}-${month}-31`)

  const debitSpentByDay = await prisma.transaction.groupBy({
    by: 'date',
    where: {
      paymentMethod: 'Débito',
      date: {
        gte: startDate,
        lte: endDate
      },
      userId: user?.id
    },
    _sum: {
      value: true
    }
  })

  const creditSpentByDay = await prisma.installment.groupBy({
    by: 'date',
    where: {
      date: {
        gte: startDate,
        lte: endDate
      },
      transaction: {
        userId: user?.id
      }
    },
    _sum: {
      value: true
    }
  })

  type SpentByDay = {
    [day: string]: number
  }

  const spentByDay: SpentByDay = {}

  const daysInTheMonth = getTotalDaysInMonth(new Date(`${year}-${month}-05`))
  for (let i = 1; i <= daysInTheMonth; i++) {
    const dateConvertedToString = `${i.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}`

    spentByDay[dateConvertedToString] = 0
  }

  debitSpentByDay.forEach(({ _sum, date }) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1

    const fullDate = `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}`

    spentByDay[fullDate] += _sum.value || 0
  })

  creditSpentByDay.forEach(({ _sum, date }) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1

    const fullDate = `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}`

    spentByDay[fullDate] += _sum.value || 0
  })

  return NextResponse.json(spentByDay)
}
