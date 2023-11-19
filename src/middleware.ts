import { NextRequest, NextResponse } from 'next/server'
import { decodeJwt } from 'jose'

type tokenType = {
  sub: string
  username: string
  iat: number
  exp: number
}
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

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  let accessTokenExpiry: tokenType | undefined
  let refreshTokenExpiry: tokenType | undefined

  const access_token = request.cookies.get('access_token')?.value
  const refresh_token = request.cookies.get('refresh_token')?.value

  if (access_token) {
    accessTokenExpiry = decodeJwt(access_token)
  }
  if (refresh_token) {
    refreshTokenExpiry = decodeJwt(refresh_token)
  }

  try {
    if (pathname === '/login') {
      console.log('Login Path')

      if (
        accessTokenExpiry &&
        accessTokenExpiry.exp > Math.floor(Date.now() / 1000)
      ) {
        console.log('Token Is Valid')

        return NextResponse.redirect(`${origin}`)
      }

      if (
        refreshTokenExpiry &&
        refreshTokenExpiry.exp > Math.floor(Date.now() / 1000)
      ) {
        try {
          const refreshTokenResponse = await fetch(
            `https://frontend-test-api.aircall.dev/graphql`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refresh_token}`,
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
          const response = NextResponse.redirect(
            new URL(`${origin}`, request.url)
          )

          response.cookies.set(
            'access_token',
            res.data.refreshTokenV2.access_token
          )
          response.cookies.set(
            'refresh_token',
            res.data.refreshTokenV2.refresh_token
          )
          return response
        } catch (error) {
          console.log(error)
        }

        // console.log('Token Is Refreshed')
        // return NextResponse.redirect(`${origin}`)
      }
      console.log('Refresh Token is Expired Or Not Avaiable')
      const response = NextResponse.rewrite(new URL(`/login`, request.url))
      response.cookies.delete('access_token')
      response.cookies.delete('refresh_token')
      return response
    }

    // For Every Other Path

    if (
      accessTokenExpiry &&
      accessTokenExpiry.exp > Math.floor(Date.now() / 1000)
    ) {
      console.log('Token Is Valid')

      return NextResponse.next()
    }

    if (
      refreshTokenExpiry &&
      refreshTokenExpiry.exp > Math.floor(Date.now() / 1000)
    ) {
      // const res = await (
      //   await fetch('http://localhost:3000/api/refreshToken', )
      // ).json()
      // const data = await res.json()
      // console.log('API RES', res)
      try {
        const refreshTokenResponse = await fetch(
          `https://frontend-test-api.aircall.dev/graphql`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refresh_token}`,
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
          const response = NextResponse.redirect(new URL(`/login`, request.url))
          response.cookies.delete('access_token')
          response.cookies.delete('refresh_token')
          return response
        }
        const res: AuthResponseType = await refreshTokenResponse.json()
        const response = NextResponse.redirect(
          new URL(`${origin}`, request.url)
        )

        response.cookies.set(
          'access_token',
          res.data.refreshTokenV2.access_token
        )
        response.cookies.set(
          'refresh_token',
          res.data.refreshTokenV2.refresh_token
        )
        return response
      } catch (error) {
        console.log(error)
      }

      // console.log('Token Is Refreshed')
      // return NextResponse.redirect(`${origin}`)
    }
    console.log('Refresh Token is Expired Or Not Avaiable')
    const response = NextResponse.redirect(new URL(`/login`, request.url))
    response.cookies.delete('access_token')
    response.cookies.delete('refresh_token')
    return response
  } catch (error) {
    console.log(error)
  }
}
export const config = {
  matcher: ['/', '/login', '/test'],
  // matcher: ['/((?!.*\\.).*)', '/favicon.ico'],
}
