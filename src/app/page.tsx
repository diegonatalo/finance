import Link from 'next/link'

export default async function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col gap-4 p-16">
      <h1 className="text-xl font-bold">Home</h1>
      <Link className="text-sky-500 underline" href="dashboard">
        Ir para Dashboard
      </Link>
    </main>
  )
}
