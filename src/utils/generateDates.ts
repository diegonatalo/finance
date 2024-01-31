import { NextRequest } from 'next/server'

export const GenerateDates = (request: NextRequest) => {
  const monthStr = request.nextUrl.searchParams.get('month')
  const yearStr = request.nextUrl.searchParams.get('year')
  const month = monthStr ? parseInt(monthStr) : new Date().getMonth() + 1
  const year = yearStr ? parseInt(yearStr) : new Date().getFullYear()

  return { month, year }
}
