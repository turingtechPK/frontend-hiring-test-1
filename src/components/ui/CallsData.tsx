import React from 'react'
import { cookies } from 'next/headers'

import CallDataTable from './CallDataTable'
import { PageProps } from '@/app/page'

export type PaginatedCalls = {
  data: {
    paginatedCalls: {
      nodes: [Call]
      totalCount: number
      hasNextPage: boolean
    }
  }
}
export type Call = {
  id: string
  direction: string
  from: string
  to: string
  duration: number
  via: String
  is_archived: Boolean
  call_type: string
  created_at: string
  notes: [Note]
}
type Note = {
  id: string
  content: string
}
const fetchCalls = async ({ offset = 0, limit = 10 }) => {
  const response = await fetch(
    'https://frontend-test-api.aircall.dev/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('access_token')?.value}`,
      },
      body: JSON.stringify({
        query: `
            query {
              paginatedCalls(offset: ${offset}, limit: ${limit}) {
                totalCount
                hasNextPage
                nodes {
                  id
                  direction
                  from
                  to
                  duration
                  via
                  is_archived
                  call_type
                  created_at
                  notes {
                    id
                    content
                  }
                }
              }
            }
          `,
      }),
    }
  )

  const result: PaginatedCalls = await response.json()
  //   console.log(result)

  return {
    data: result.data.paginatedCalls.nodes,
    hasNextPage: result.data.paginatedCalls.hasNextPage,
    totalPages: Math.ceil(result.data.paginatedCalls.totalCount / limit),
  }
}
const CallsData = async (props: PageProps) => {
  const { page } = props.searchParams as { [key: string]: string }
  const pageNumber = Number(page ? page : 1)
  const skip = (pageNumber - 1) * 10
  const data = await fetchCalls({ offset: skip, limit: 10 })

  // console.log(data)
  return <CallDataTable data={data} pageNumber={pageNumber} />
}

export default CallsData
