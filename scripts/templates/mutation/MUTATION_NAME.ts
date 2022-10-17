import { gql, MutationTuple, useMutation } from "@apollo/client"
import { MUTATION_INPUT_VARIABLES, MUTATION_RETURN_DATA } from "./MUTATION_NAME.interfaces"

export const MUTATION_SNAKE = gql`
  mutation MUTATION_CAMEL() {
    MUTATION_CAMEL() {}
  }
`

export const MUTATION_NAME = (): MutationTuple<MUTATION_RETURN_DATA, MUTATION_INPUT_VARIABLES> =>
  useMutation<MUTATION_RETURN_DATA, MUTATION_INPUT_VARIABLES>(MUTATION_SNAKE)
