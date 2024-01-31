import { useEffect } from 'react'

export const Loader = () => {
  useEffect(() => {
    async function getLoader() {
      const { ring } = await import('ldrs')
      ring.register()
    }
    getLoader()
  }, [])
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <l-ring size={40} stroke={5} speed={2} color="white"></l-ring>
    </div>
  )
}
