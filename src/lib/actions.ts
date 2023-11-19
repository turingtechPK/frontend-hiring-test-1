'use server'
import { cookies } from 'next/headers'
type AuthResponseType = {
  data: {
    login: {
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

export async function authenticate(prevState: any, formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')
  try {
    const response = await fetch(
      `https://frontend-test-api.aircall.dev/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation LoginMutation($input: LoginInput!) {
              login(input: $input) {
                access_token
                refresh_token
                user {
                  id
                  username
                  
                }
              }
            }
          `,
          variables: {
            input: {
              username,
              password,
            },
          },
        }),
      }
    )

    const res: AuthResponseType = await response.json()
    console.log(res.data.login)
    const data = res.data.login
    const cookiesList = cookies()
    const hasAccesstoken = cookiesList.has('access_token')
    const hasRefreshToken = cookiesList.has('refresh_token')
    if (hasAccesstoken) {
      cookies().delete('access_token')
    }
    if (hasRefreshToken) {
      cookies().delete('refresh_token')
    }
    cookies().set('access_token', data.access_token)
    cookies().set('refresh_token', data.refresh_token)
    return { message: 'Logged In Successfully' }
    //   if (data.errors) {
    //     // Handle GraphQL errors
    //     console.error('GraphQL Error:', data.errors)
    //     return
    //     }
    //     console.log(data);

    // Update the access token and user state
    //   setAccessToken(data.data.login.access_token)
    //   setUser(data.data.login.user)
  } catch (error) {
    console.error('Login Error:', error)
  }
}
