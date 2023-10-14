import request, { Variables } from 'graphql-request'

const URL = 'https://frontend-test-api.aircall.dev/graphql'

export const sendGraphQlRequest = <T>(
  query: string,
  inputs: Variables | undefined,
  headers = {
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  }
): Promise<T> => {
  return request<T>(URL, query, inputs, headers)
}
