import { callsService, CALLS_ROUTES } from "@/services/calls";
import useSwr from "swr";

export default function useCalls(offset: number = 0, limit: number = 10) {
  const { data, error, isLoading, mutate } = useSwr(
    `${CALLS_ROUTES.calls}?offset=${offset}&limit=${limit}`,
    callsService.getCalls
  );

  return { data, error, isLoading, mutate };
}
