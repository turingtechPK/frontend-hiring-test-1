import getQueryClient from "@/lib/query/QueryClient"
import { QueryProvider } from "@/lib/query/QueryProvider"
import { Hydrate, dehydrate } from "@tanstack/react-query"

export default async function CallsPage() {
  const queryClient = getQueryClient()
  // await queryClient.prefetchQuery(['posts'], getPosts)
  const dehydratedState = dehydrate(queryClient)

  return (
    <QueryProvider>
      <Hydrate state={dehydratedState}>
        <div>
          CallsPage
        </div>
      </Hydrate>
    </QueryProvider>
  )
}