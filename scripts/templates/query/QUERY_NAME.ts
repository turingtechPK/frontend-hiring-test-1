import { gql, QueryResult, useQuery } from "@apollo/client"
import { QUERY_INPUT_VARIABLES, QUERY_RETURN_DATA } from "./QUERY_NAME.interfaces"

export const QUERY_SNAKE = gql`
  query QUERY_CAMEL {
    QUERY_CAMEL {}
  }
`

export const QUERY_NAME = (): QueryResult<QUERY_RETURN_DATA, QUERY_INPUT_VARIABLES> =>
  useQuery<QUERY_RETURN_DATA, QUERY_INPUT_VARIABLES>(QUERY_SNAKE)
