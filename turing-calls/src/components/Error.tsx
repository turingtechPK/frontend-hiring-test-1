import { Alert } from 'antd'

type Props = {
  error: ErrorResponse
}

export type ErrorResponse = {
  response: {
    errors: Error[]
  }
}

export type Error = {
  message: string
  path: string[]
}

export const Error: React.FC<Props> = ({ error }) => {
  const message = error.response.errors[0].message

  return (
    <Alert message="Something went wrong!" description={message} type="error" />
  )
}
