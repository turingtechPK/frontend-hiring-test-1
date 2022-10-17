import { BaseQueryFn } from "@reduxjs/toolkit/query"
import { GraphQLClient } from "graphql-request"
import { store } from "../redux"
import { logout } from "../redux/slice"

const client = new GraphQLClient(process.env.NEXT_PUBLIC_APP_APIURL ?? "", {
  headers: { "Content-Type": "application/json" },
})

type Query = {
  document: string
  variables?: Record<string, any>
}

type BaseQuery = BaseQueryFn<Query, Record<any, any>, Record<any, any>>

export const axiosBaseQuery: BaseQuery = async (query, basequery) => {
  let { document, variables = undefined } = query

  const token = store.getState().auth.access_token
  if (token) client.setHeader("Authorization", `Bearer ${token}`)

  const result = await client.request(document, variables).catch((error: any) => {
    if (error?.response?.errors?.[0]?.message === "Unauthorized") store.dispatch(logout())
    throw error?.response?.errors?.[0]?.message ?? error ?? "Some Error Occured"
  })

  return { data: Object.values(result)[0] as Record<string, any> }
}
