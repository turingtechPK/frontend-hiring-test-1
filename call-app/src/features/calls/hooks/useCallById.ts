import { useQuery } from "@apollo/client";
import { GET_CALL_BY_ID } from "../graphql/calls";

export const useCallById = (id: string) => {
  const { data, loading, error } = useQuery(GET_CALL_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });

  return {
    call: data?.call,
    loading,
    error,
  };
};
