import { useQuery } from '@tanstack/react-query';
import { fetchCalls } from '../api/callApi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useCalls = (offset: number, limit: number, statusFilter: string) => {
    const token = useSelector((state: RootState) => state.auth.token);
    
    const {
      data,
      isLoading,
      isError,
      error,
      refetch
    } = useQuery({
      queryKey: ['calls', { offset, limit, statusFilter }],
      queryFn: async () => {
        if (!token) {
          throw new Error('No authentication token available');
        }
        return await fetchCalls(offset, limit, token);
      },
      enabled: !!token,
      staleTime: 5 * 60 * 1000, 
      retry: 2,
    });
  
    const calls = data?.nodes || [];
    const totalCount = data?.totalCount || 0;
  
    const filteredCalls = calls.filter((call) => {
      if (statusFilter === 'Archive' && call.is_archived) {
        return true;
      } else if (statusFilter === 'unarchive' && !call.is_archived) {
        return true;
      }
      return statusFilter === '' 
    });
  
    return {
      calls: filteredCalls,
      totalCount,
      loading: isLoading,
      error: isError ? error : null,
      refetch
    };
  };
  
