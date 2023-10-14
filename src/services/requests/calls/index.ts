import { server } from '..'
import { CALLS_API_ENDPOINTS, GetCallsPayload, GetCallsResponse } from './types'

export const getCalls = async ({
  offset = 0,
  limit = 100,
  accessToken,
}: GetCallsPayload): Promise<GetCallsResponse> => {
  const response = await fetch(
    'https://frontend-test-api.aircall.dev/' +
      CALLS_API_ENDPOINTS.GET_CALLS +
      `?offset=${offset}&limit=${limit}`,
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
