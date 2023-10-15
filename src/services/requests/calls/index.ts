import { AxiosError } from 'axios'
import { server } from '..'
import { CALLS_API_ENDPOINTS, GetCallsPayload, GetCallsResponse } from './types'
import { Call } from '@/lib/types'

export const getCallsServer = async ({
  pageIndex,
  pageSize = 9,
  accessToken,
}: GetCallsPayload): Promise<GetCallsResponse> => {
  const response = await fetch(
    'https://frontend-test-api.aircall.dev/' +
      CALLS_API_ENDPOINTS.GET_CALLS +
      `?offset=${pageIndex}&limit=${pageSize}`,
    {
      next: {
        revalidate: 0,
      },
      ...(accessToken && {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    },
  )
  console.log(response.url)
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const data = await response.json()
  return data
}

export const getCalls = async ({
  pageIndex,
  pageSize = 9,
}: GetCallsPayload): Promise<GetCallsResponse> => {
  try {
    const { data } = await server.get(
      CALLS_API_ENDPOINTS.GET_CALLS + `?offset=${pageIndex}&limit=${pageSize}`,
    )
    return data
  } catch (err) {
    throw err
  }
}

type PostNotePayload = {
  id: string
  content: string
}

export const postNote = async ({ id, content }: PostNotePayload): Promise<Call> => {
  const response = await server.post<Call>(`calls/${id}/note`, { content })
  return response.data
}
