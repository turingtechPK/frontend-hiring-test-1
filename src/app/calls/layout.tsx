import getQueryClient from '@/lib/query/QueryClient'
import { QueryProvider } from '@/lib/query/QueryProvider'
import { getCalls } from '@/services/requests/calls'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default async function CallsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie: any = cookies()
  const { value: accessToken } = cookie.get('access_token')
  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery(['calls'], ({ pageParam = 0 }) => {
    return getCalls({ offset: pageParam, accessToken })
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <QueryProvider>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools />
    </QueryProvider>
  )
}
