import getQueryClient from '@/lib/query/QueryClient'
import { QueryProvider } from '@/lib/query/QueryProvider'
import { Hydrate, dehydrate } from '@tanstack/react-query'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  const dehydratedState = dehydrate(queryClient)

  return (
    <QueryProvider>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryProvider>
  )
}
