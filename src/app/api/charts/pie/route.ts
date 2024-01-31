import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const user = await currentUser()

  const monthStr = request.nextUrl.searchParams.get('month')
  const yearStr = request.nextUrl.searchParams.get('year')
  const month = monthStr ? parseInt(monthStr) : new Date().getMonth() + 1
  const year = yearStr ? parseInt(yearStr) : new Date().getFullYear()

  const startDate = new Date(`${year}-${month}-01`)
  const endDate = new Date(`${year}-${month}-31`)

  const debitSpent = await prisma.transaction.findMany({
    where: {
      paymentMethod: 'Débito',
      date: {
        gte: startDate,
        lte: endDate
      },
      userId: user?.id
    }
  })

  const creditSpent = await prisma.installment.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate
      },
      transaction: {
        userId: user?.id
      }
    },
    include: {
      transaction: true
    }
  })

  type SpentByCategory = {
    [category: string]: number
  }

  const spentByCategory: SpentByCategory = {}

  debitSpent.forEach((transaction) => {
    const { category, value } = transaction

    if (!spentByCategory[category]) {
      spentByCategory[category] = value
    } else {
      spentByCategory[category] += value
    }
  })

  creditSpent.forEach((installment) => {
    const { value, transaction } = installment

    if (!spentByCategory[transaction.category]) {
      spentByCategory[transaction.category] = value
    } else {
      spentByCategory[transaction.category] += value
    }
  })

  const spentArray: Array<[string, number]> = Object.entries(spentByCategory)
  const orderedSpent = spentArray.sort((a, b) => b[1] - a[1])

  const orderedSpentByCategory: SpentByCategory = {}

  orderedSpent.forEach(([category, value]) => {
    orderedSpentByCategory[category] = value
  })

  return NextResponse.json(orderedSpentByCategory)
}
