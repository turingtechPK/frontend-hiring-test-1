import { BaseQueryFn } from "@reduxjs/toolkit/query"
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios"

import { store } from "../redux"
import { logout } from "../redux/slice"

export const axiosClient = Axios.create({
  baseURL: process.env.REACT_APP_APIURL,
  headers: { "Content-Type": "application/json" },
})

axiosClient.interceptors.request.use((request: any) => {
  const token = store.getState().auth.access_token

  if (token) request.headers = { ...request.headers, Authorization: `Bearer ${token}` }

  return request
})

axiosClient.interceptors.response.use((response: AxiosResponse<Record<any, any>>) => {
  //
  // if response in data is string convert it to JSON
  //
  if (response.data && typeof response.data === "string") response.data = JSON.parse(response.data)

  //
  // if error got into response throw it into error
  //
  if (!response.status.toString().startsWith("2")) throw response

  return response
})

axiosClient.interceptors.response.use(undefined, (error: AxiosError<Record<any, any>>) => {
  if (Number(error.response?.status) === 401) {
    store.dispatch(logout())
  }

  throw error
})

type extraoptions = Partial<Omit<AxiosRequestConfig, "url" | "method" | "data" | "params">>

type Query = {
  url: string
  method?: Method
  formData?: boolean
  data?: AxiosRequestConfig["data"]
  params?: AxiosRequestConfig["params"]
}

type BaseQuery = BaseQueryFn<
  Query,
  Record<any, any>,
  Record<any, any>,
  extraoptions | ((value: Query) => extraoptions)
>

export const axiosBaseQuery = (): BaseQuery => async (query, basequery, extraOptions) => {
  let { url, method = "get", data = undefined, params = undefined, formData } = query

  if (formData) {
    const formdata = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      formdata.append(key, value as string | Blob)
    })

    data = formdata
  } else {
    data = JSON.stringify(data)
  }

  const result = await axiosClient
    .request({
      url,
      method,
      data,
      params,
      ...(typeof extraOptions === "function" ? extraOptions(query) : extraOptions),
    })
    .catch((error: any) => {
      throw error?.data?.message ?? error?.message ?? "Some Error Occured"
    })

  return { data: result.data }
}
