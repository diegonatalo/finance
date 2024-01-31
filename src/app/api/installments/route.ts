import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const user = await currentUser()

  const pageStr = request.nextUrl.searchParams.get('page')
  let page = pageStr ? parseInt(pageStr) : 1
  const limit = 10

  const totalInstallmentsCount = await prisma.installment.count({
    where: {
      transaction: {
        userId: user!.id
      }
    }
  })
  const maxPage = Math.ceil(totalInstallmentsCount / limit)

  if (page > maxPage && page > 1) {
    page--
  }

  const skip = (page - 1) * limit

  const installments = await prisma.installment.findMany({
    where: {
      transaction: {
        userId: user?.id
      }
    },
    skip,
    take: limit,
    orderBy: {
      date: 'desc'
    }
  })

  const data = {
    installments,
    maxPage
  }

  return NextResponse.json(data)
}
