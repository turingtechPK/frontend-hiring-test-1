import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { archiveCallAsync } from '@/features/api';
import { useCallsContext } from '@/pages/calls/hooks';

export function useArchiveCall(): readonly [handleArchiveAsync: (callId: string) => Promise<void>, isLoading: boolean] {
  const { setData } = useCallsContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleArchiveAsync = async (callId: string): Promise<void> => {
    setIsLoading(true);
    const result = await archiveCallAsync(callId);

    if (!result) {
      enqueueSnackbar('Could not archive call.', { variant: 'error' });
      setIsLoading(false);
      return;
    }

    enqueueSnackbar(`Call ${!result.is_archived ? 'un' : ''}archived.`, { variant: 'success' });

    setData((data) => {
      if (!data) return data;

      if (data?.nodes) {
        const index = data.nodes.findIndex((call) => call.id === result.id);
        return {
          totalCount: data.totalCount,
          hasNextPage: data.hasNextPage,
          nodes: data.nodes.toSpliced(index, 1, result),
        };
      }

      return { ...data };
    });

    setIsLoading(false);
  };

  return [handleArchiveAsync, isLoading] as const;
}
