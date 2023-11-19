export const dynamic = 'force-dynamic'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

type AuthResponseType = {
  data: {
    refreshTokenV2: {
      access_token: string
      refresh_token: string
      user: UserType
    }
  }
}
type UserType = {
  id: String
  username: String
}
export async function GET(request: NextRequest) {
  const cookiesList = cookies()
  console.log('Cookies', request.cookies.get('refresh_token')?.value)
  const hasAccesstoken = cookiesList.has('access_token')
  const hasRefreshToken = cookies().get('refresh_token')
  console.log('Has Refresh Token', hasRefreshToken)
  try {
    if (hasRefreshToken) {
      const refreshTokenResponse = await fetch(
        `https://frontend-test-api.aircall.dev/graphql`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies().get('refresh_token')}`,
          },
          body: JSON.stringify({
            query: `
                  mutation RefreshTokenMutation {
                   refreshTokenV2{
          access_token
          refresh_token
          user{
            username
          }
        }
                  }
                `,
          }),
        }
      )
      if (!refreshTokenResponse.ok) {
        console.log('Refresh Res Is not OK')
        return NextResponse.next()
      }
      const res: AuthResponseType = await refreshTokenResponse.json()
      const hasAccesstoken = cookiesList.has('access_token')
      const hasRefreshToken = cookiesList.has('refresh_token')
      if (hasAccesstoken) {
        cookies().delete('access_token')
      }
      if (hasRefreshToken) {
        cookies().delete('refresh_token')
      }
      cookies().set('access_token', res.data.refreshTokenV2.access_token)
      cookies().set('refresh_token', res.data.refreshTokenV2.refresh_token)
      return NextResponse.json({ message: 'Tokens Refetched' })
    }
    return NextResponse.json({ message: 'Failed to refetch Token' })
    // console.log('Response', response.ok)
  } catch (error) {
    console.log('Error Refreshing Token', error)
  }
}
