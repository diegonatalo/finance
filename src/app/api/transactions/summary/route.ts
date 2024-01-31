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

  const totalDebitTransactions = await prisma.transaction.aggregate({
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

  const totalCreditTransactions = await prisma.installment.aggregate({
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

  const total =
    (totalDebitTransactions._sum.value || 0) +
    (totalCreditTransactions._sum.value || 0)

  return NextResponse.json(total)
}
