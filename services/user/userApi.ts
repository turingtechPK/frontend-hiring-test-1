import { differenceInSeconds, fromUnixTime, subMinutes } from "date-fns"
import jwt_decode from "jwt-decode"
import { AuthStore, setAuth } from "../../redux/slice"
import { rtkApi } from "../rtk"

export const userApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Required<AuthStore>, { username: string; password: string }>({
      query: (data) => ({
        document: `mutation Login($input: LoginInput!) {
          login(input: $input) {
            access_token
            refresh_token
            user {
              id
              username
            }
          }
        }`,
        variables: { input: data },
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          dispatch(setAuth(response.data))
          refreshTokenTimer(dispatch, response.data.access_token)
        })
      },
    }),
    refreshToken: builder.mutation<Required<AuthStore>, void>({
      query: () => ({
        document: `mutation User {
        refreshToken {
          user {
            id
            username
          }
          access_token
        }
      }`,
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          dispatch(setAuth(response.data))
          refreshTokenTimer(dispatch, response.data.access_token)
        })
      },
    }),
  }),
})

export const { useLoginMutation } = userApi

let timeout: NodeJS.Timeout | undefined = undefined

export function refreshTokenTimer(dispatch: any, token: string) {
  const decoded = jwt_decode<{ exp: number; iat: number; sub: string; username: string }>(token)

  // gets expiry time
  const expdate = new Date(fromUnixTime(decoded.exp))
  // subtract minute from expiry time
  const Submint = subMinutes(expdate, 1)
  // calculate exact time
  const seconds = differenceInSeconds(Submint, new Date())

  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => dispatch(userApi.endpoints.refreshToken.initiate()), seconds * 1000)
}
