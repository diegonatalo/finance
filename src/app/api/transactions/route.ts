import { Installment } from '@/@types/TransactionTypes'
import { prisma } from '@/lib/prisma'
import { createInstallments } from '@/utils/createInstallments'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const user = await currentUser()

  const pageStr = request.nextUrl.searchParams.get('page')
  const sortValueOrder = request.nextUrl.searchParams.get('sortValueOrder')
  const sortDateOrder = request.nextUrl.searchParams.get('sortDateOrder')
  let page = pageStr ? parseInt(pageStr) : 1
  const limit = 10

  const totalTransactionsCount = await prisma.transaction.count({
    where: { userId: user?.id }
  })
  const maxPage = Math.ceil(totalTransactionsCount / limit)

  if (page > maxPage && page > 1) {
    page--
  }

  const skip = (page - 1) * limit

  const transactions = await prisma.transaction.findMany({
    where: { userId: user?.id },
    skip,
    take: limit,
    orderBy: [
      { date: sortDateOrder === 'desc' ? 'desc' : 'asc' },
      { value: sortValueOrder === 'desc' ? 'desc' : 'asc' },
      { title: 'asc' }
    ]
  })

  const data = {
    transactions,
    maxPage
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const transaction = await request.json()

    let installments: Installment[] = []

    if (transaction.paymentMethod === 'Crédito') {
      installments = createInstallments(transaction)
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        installments: {
          create: installments
        }
      }
    })

    return new NextResponse(JSON.stringify(newTransaction), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return new NextResponse(JSON.stringify('Transaction already exists'), {
        status: 409
      })
    }

    return new NextResponse(error.message, { status: 500 })
  }
}
