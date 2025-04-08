import { useQuery } from '@tanstack/react-query';
import { fetchCallById } from '../api/callApi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


export const useCallById = (id: string) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    data: call,
    isLoading: loading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['call', id],
    queryFn: async () => {
      if (!token) {
        throw new Error('No authentication token available');
      }
      return await fetchCallById(id, token);
    },
    enabled: !!id && !!token,
    staleTime: 5 * 60 * 1000, 
    retry: 1, 
  });

  const errorMessage = isError ? 
    (error instanceof Error ? error.message : 'Failed to fetch call data') : 
    null;

  return { 
    call, 
    loading, 
    error: errorMessage,
    refetch 
  };
};
