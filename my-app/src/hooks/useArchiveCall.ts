import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveCall } from '../api/callApi'; 
import { call } from '../Interfaces/call';



export const useArchiveCall = () => {
  const queryClient = useQueryClient();
  
  const getToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Authentication token not found');
    return token;
  };

  const mutation = useMutation({
    mutationFn: (id: string) => {
      const token = getToken();
      return archiveCall(id, token);
    },
    
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['calls'] });
      const previousCalls = queryClient.getQueryData<call[]>(['calls',{ offset: 0, limit: 10 }]);
      
      queryClient.setQueryData<call[]>(['calls'], (old = []) => {
        return Array.isArray(old)
          ? old.map(call => 
              call.id === id 
                ? { ...call, archived: !call.archived } 
                : call
            )
          : [];
      });
      return { previousCalls };
    },
    
    onError: (err, _id, context) => {
      console.error('Error archiving call:', err);
      queryClient.setQueryData(['calls'], context?.previousCalls);
    },
    
    onSettled: () => {
        
        queryClient.invalidateQueries({ queryKey: ['calls'], exact: false });
      },
  });

  return mutation;
};
  
