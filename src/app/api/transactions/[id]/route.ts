import { Installment } from '@/@types/TransactionTypes'
import { prisma } from '@/lib/prisma'
import { createInstallments } from '@/utils/createInstallments'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const transaction = await prisma.transaction.findUnique({
    where: {
      id
    }
  })

  if (!transaction) {
    return new NextResponse('No transaction with ID found', { status: 404 })
  }

  return NextResponse.json(transaction)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const transactionId = params.id
  const transaction = await request.json()

  await prisma.installment.deleteMany({
    where: { transactionId }
  })

  let installments: Installment[] = []

  if (transaction.paymentMethod === 'Crédito') {
    installments = createInstallments(transaction)
  }

  const updatedTransaction = await prisma.transaction.update({
    where: { id: transactionId },
    data: {
      ...transaction,
      installments: {
        create: installments
      }
    }
  })

  if (!updatedTransaction) {
    return new NextResponse('No transaction with ID found', { status: 404 })
  }

  return NextResponse.json(updatedTransaction)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const transactionId = params.id
    await prisma.installment.deleteMany({
      where: { transactionId }
    })
    await prisma.transaction.delete({
      where: { id: transactionId }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return new NextResponse('No transaction with ID found', { status: 404 })
    }

    return new NextResponse(error.message, { status: 500 })
  }
}
