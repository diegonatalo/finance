import { api } from '@/lib/axios'
import useSWR from 'swr'

export const useFetcher = <Data = any>(url: string) => {
  const { data, error, isLoading } = useSWR<Data>(
    url,
    async (url: string) => await api.get(url).then((r) => r.data),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      refreshInterval: 2000
    }
  )

  return { data, error, isLoading }
}
